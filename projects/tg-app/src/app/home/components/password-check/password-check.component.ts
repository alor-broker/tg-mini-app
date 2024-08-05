import { ChangeDetectorRef, Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from "@angular/common";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { PasswordFormComponent } from "../../../authentication/components/password-form/password-form.component";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { filter, Observable, shareReplay } from "rxjs";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RoutesHelper } from "../../../core/utils/routes.helper";
import { switchMap } from "rxjs/operators";
import { BackButtonService, BiometryService, StorageService } from "@environment-services-lib";
import { PasswordCheckService } from "../../services/password-check.service";
import { NzDrawerComponent, NzDrawerContentDirective } from "ng-zorro-antd/drawer";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { PasswordCheckParams } from "../../services/password-check-service.model";
import { StorageKeys } from "../../../core/utils/storage-keys";

@Component({
  selector: 'tga-password-check',
  standalone: true,
  imports: [
    PasswordFormComponent,
    AsyncPipe,
    ReactiveFormsModule,
    NzButtonComponent,
    NzDrawerComponent,
    NzIconDirective,
    NzDrawerContentDirective
  ],
  templateUrl: './password-check.component.html',
  styleUrl: './password-check.component.less'
})
export class PasswordCheckComponent implements OnInit, OnDestroy {
  passwordControl = new FormControl('');
  isBiometryAvailable$!: Observable<boolean>;
  isBackButtonAvailable = false;
  passwordCheckParams$!: Observable<PasswordCheckParams>;

  passwordError = false;

  constructor(
    private readonly biometryService: BiometryService,
    private readonly storageService: StorageService,
    private readonly backButtonService: BackButtonService,
    private readonly router: Router,
    private readonly passwordCheckService: PasswordCheckService,
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef
  ) {
  }

  ngOnInit() {
    this.checkPassword();

    this.passwordCheckService.passwordCheckParams$
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(params => {
        this.passwordControl.reset('');

        if (!params.isChecked) {
          if (params.isBackVisible) {
            this.backButtonService.show();
            this.backButtonService.onClick(this.onBack);
          } else {
            this.backButtonService.hide();
          }
        } else {
          this.backButtonService.offClick(this.onBack);
          this.backButtonService.hide();
        }
      });

    this.isBackButtonAvailable = this.backButtonService.isAvailable;
    this.passwordCheckParams$ = this.passwordCheckService.passwordCheckParams$;
  }

  ngOnDestroy() {
    this.backButtonService.offClick(this.onBack);
  }

  checkPassword() {
    this.storageService.getItem(StorageKeys.AppPassword)
      .subscribe(
        (val: string | null) => {
          if (val == null || val === '') {
            this.resetPassword();
          }

          if (JSON.parse(val!) == null) {
            this.passwordCheckService.passwordChecked(true);
            return;
          }

          this.passwordControl.valueChanges
            .pipe(
              takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(v => {
              if (v == null) {
                return;
              }

              if (this.passwordError && v.length > 0) {
                this.passwordError = false;
                this.cdr.detectChanges();
              }

              if (v.length != 4) {
                return;
              }

              if (v === val) {
                this.passwordCheckService.passwordChecked(true);
              } else {
                this.passwordError = true;
                this.passwordControl.setValue('');
                this.cdr.detectChanges();
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
          this.passwordCheckService.passwordChecked(true);
        }
      });
  }

  resetPassword() {
    RoutesHelper.openFromRoot(this.router, RoutesHelper.appRoutes.authentication.createPassword);
  }

  onBack = () => {
    this.backButtonService.offClick(this.onBack);
    this.backButtonService.hide();
    this.passwordCheckService.passwordChecked(false)
  }
}
