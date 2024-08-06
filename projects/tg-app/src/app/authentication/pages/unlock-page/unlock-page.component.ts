import { ChangeDetectorRef, Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, Location } from "@angular/common";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { PasswordFormComponent } from "../../components/password-form/password-form.component";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { BehaviorSubject, filter, Observable, shareReplay, take, tap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RoutesHelper } from "../../../core/utils/routes.helper";
import { switchMap } from "rxjs/operators";
import { BackButtonService, BiometryService, StorageService } from "@environment-services-lib";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { StorageKeys } from "../../../core/utils/storage-keys";
import { ApiTokenProviderService } from "../../../core/services/api-token-provider.service";

@Component({
  selector: 'tga-password-check',
  standalone: true,
  imports: [
    PasswordFormComponent,
    AsyncPipe,
    ReactiveFormsModule,
    NzButtonComponent,
    NzIconDirective
  ],
  templateUrl: './unlock-page.component.html',
  styleUrl: './unlock-page.component.less'
})
export class UnlockPageComponent implements OnInit, OnDestroy {
  isLoading$ = new BehaviorSubject(true);
  passwordControl = new FormControl('');
  isBiometryAvailable$!: Observable<boolean>;

  isBackButtonAvailable = false;
  isCancelable = false;
  redirectUrl!: string;

  passwordError = false;

  constructor(
    private readonly biometryService: BiometryService,
    private readonly storageService: StorageService,
    private readonly backButtonService: BackButtonService,
    private readonly apiTokenProviderService: ApiTokenProviderService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef
  ) {
  }

  ngOnInit() {
    this.apiTokenProviderService.apiToken$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.route.queryParams),
        take(1),
        tap(() => this.isLoading$.next(false)),
      )
      .subscribe(params => {
        this.isCancelable = params['isCancellable'];
        this.redirectUrl = params['redirectUrl'] ?? RoutesHelper.urlForRoot(RoutesHelper.appRoutes.home);

        if (this.isCancelable) {
          this.backButtonService.show();
          this.backButtonService.onClick(this.onBack);
        } else {
          this.backButtonService.hide();
        }

        this.checkPassword();
        this.cdr.detectChanges();
      });

    this.isBackButtonAvailable = this.backButtonService.isAvailable;
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
            this.passwordChecked();
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
                this.hideBackButton();
                this.passwordChecked();
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
          this.hideBackButton();
          this.passwordChecked();
        }
      });
  }

  resetPassword() {
    RoutesHelper.openFromRoot(this.router, RoutesHelper.appRoutes.authentication.createPassword);
  }

  onBack = () => {
    this.hideBackButton();
    this.location.back();
  }

  private hideBackButton() {
    this.backButtonService.offClick(this.onBack);
    this.backButtonService.hide();
  }

  private passwordChecked() {
    this.router.navigate([this.redirectUrl], { queryParams: { checked: true } })
  }
}
