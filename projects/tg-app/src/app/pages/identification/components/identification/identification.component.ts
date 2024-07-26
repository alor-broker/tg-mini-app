import { ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { BehaviorSubject, filter, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BiometryService, StorageService } from "@environment-services-lib";
import { AsyncPipe } from "@angular/common";
import { PasswordFormComponent } from "../password-form/password-form.component";
import { RoutesHelper } from "../../../../core/utils/routes.helper";
import { ApiTokenProviderService } from "../../../../core/services/api-token-provider.service";

@Component({
  selector: 'tga-identification',
  standalone: true,
  imports: [ AsyncPipe, ReactiveFormsModule, PasswordFormComponent ],
  templateUrl: './identification.component.html',
  styleUrl: './identification.component.less'
})
export class IdentificationComponent implements OnInit {
  appPasswordKey = 'app-password';
  passwordControl = new FormControl('');
  isLoading = new BehaviorSubject(true);

  constructor(
    private readonly biometryService: BiometryService,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly apiTokenProviderService: ApiTokenProviderService,
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef
  ) {
  }

  ngOnInit() {
    // TODO: убрать, когда появятся http-запросы (сделано для возможности перекидывать на SSO
    this.apiTokenProviderService.apiToken$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.isLoading.next(false)),
      )
      .subscribe(() => {
        this.cdr.detectChanges();
        this.checkPassword();
      });
  }

  checkPassword() {
    this.storageService.getItem(this.appPasswordKey)
      .subscribe(
        val => {
          if (val == null || val === '') {
            this.router.navigate([ '/password-create' ])
          }

          this.passwordControl.valueChanges
            .pipe(
              takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(v => {
              if (v == null || v.length != 4) {
                return;
              }

              if (v === val) {

                this.router.navigate([ `/${RoutesHelper.appRoutes.home}` ])
              } else {
                this.passwordControl.setValue('');
              }
            })

          this.initIdentification();
    })
  }

  initIdentification() {
    this.biometryService.isBiometryAvailable()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(isAvailable => isAvailable),
        switchMap(() => this.biometryService.authenticate('Вход по биометрии'))
      )
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate([ `/${RoutesHelper.appRoutes.home}`  ])
        }
      });
  }

  resetPassword() {
    this.router.navigate([ '/password-create' ])
  }
}
