import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit
} from '@angular/core';
import { PasswordFormComponent } from "../../components/password-form/password-form.component";
import { AsyncPipe } from "@angular/common";
import {
  BiometryService,
  StorageService
} from "@environment-services-lib";
import {
  FormControl,
  ReactiveFormsModule
} from "@angular/forms";
import {
  BehaviorSubject,
  filter,
  Observable,
  shareReplay,
  tap
} from "rxjs";
import { Router } from "@angular/router";
import { ApiTokenProviderService } from "../../../core/services/api-token-provider.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RoutesHelper } from "../../../core/utils/routes.helper";
import { switchMap } from "rxjs/operators";
import { NzButtonComponent } from "ng-zorro-antd/button";

@Component({
  selector: 'tga-unlock-page',
  standalone: true,
  imports: [
    PasswordFormComponent,
    AsyncPipe,
    ReactiveFormsModule,
    NzButtonComponent
  ],
  templateUrl: './unlock-page.component.html',
  styleUrl: './unlock-page.component.less'
})
export class UnlockPageComponent implements OnInit {
  appPasswordKey = 'app-password';
  passwordControl = new FormControl('');
  isLoading = new BehaviorSubject(true);
  isBiometryAvailable$!: Observable<boolean>;

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
            this.resetPassword();
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
                RoutesHelper.openFromRoot(this.router, RoutesHelper.appRoutes.home);
              } else {
                this.passwordControl.setValue('');
              }
            })

          this.initIdentification();
        })
  }

  initIdentification() {
    this.isBiometryAvailable$ = this.biometryService.isBiometryAvailable()
      .pipe(
        shareReplay(1)
      );

    this.scanBiometry();
  }

  scanBiometry() {
    this.isBiometryAvailable$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(isAvailable => isAvailable),
        switchMap(() => this.biometryService.authenticate('Вход по биометрии'))
      )
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          RoutesHelper.openFromRoot(this.router, RoutesHelper.appRoutes.home);
        }
      });
  }

  resetPassword() {
    RoutesHelper.openFromRoot(this.router, RoutesHelper.appRoutes.authentication.createPassword);
  }
}
