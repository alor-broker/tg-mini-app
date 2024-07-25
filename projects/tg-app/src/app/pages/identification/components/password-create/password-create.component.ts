import { ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { StorageService, BiometryService } from "@environment-services-lib";
import { of, switchMap } from "rxjs";
import { PasswordFormComponent } from "../password-form/password-form.component";

enum PasswordPhase {
  Create = 'create',
  Repeat = 'repeat'
}

@Component({
  selector: 'tga-password-create',
  standalone: true,
  imports: [ ReactiveFormsModule, PasswordFormComponent ],
  templateUrl: './password-create.component.html',
  styleUrl: './password-create.component.less'
})
export class PasswordCreateComponent implements OnInit {

  appPasswordKey = 'app-password';

  passwordCtrl = new FormControl('');
  passwordPhaseEnum = PasswordPhase;
  passwordPhase = PasswordPhase.Create;
  createdPassword = '';

  constructor(
    private readonly storageService: StorageService,
    private readonly biometryService: BiometryService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
  ) {
  }

  ngOnInit() {
    this.passwordCtrl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(v => {
        if (v == null || v.length != 4) {
          return;
        }

        if (this.passwordPhase === PasswordPhase.Create) {
          this.createdPassword = v;
          this.passwordPhase = PasswordPhase.Repeat;
          this.passwordCtrl.setValue('');
          this.cdr.detectChanges();
          return;
        }

        if (v === this.createdPassword) {
          this.storageService.setItem(this.appPasswordKey, v)
            .subscribe(
              isSaved => {
                if (!isSaved) {
                  this.createdPassword = '';
                  this.passwordPhase = PasswordPhase.Create;
                  this.passwordCtrl.setValue('');
                  this.cdr.detectChanges();
                }

                this.setBiometry();
              }
            )
        } else {
          this.passwordCtrl.setValue('');
          this.cdr.detectChanges();
        }
      });
  }

  createAgain() {
    this.passwordPhase = PasswordPhase.Create;
    this.createdPassword = '';
    this.passwordCtrl.setValue('');
    this.cdr.detectChanges();
  }

  private setBiometry() {
    this.biometryService.isBiometryAvailable()
      .pipe(
        switchMap(isAvailable => {
          if (isAvailable) {
            return this.biometryService.requestAccess('Для входа по биометрии предоставьте доступ')
          }

          return of(null);
        })
      )
      .subscribe(() => {
        this.router.navigate([ '/identification' ]);
        this.cdr.detectChanges();
      })
  }
}
