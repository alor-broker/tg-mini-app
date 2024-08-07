import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit
} from '@angular/core';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NzSwitchComponent } from "ng-zorro-antd/switch";
import { SectionPanelComponent } from "../../../core/components/sections/section-panel/section-panel.component";
import { SectionsComponent } from "../../../core/components/sections/sections/sections/sections.component";
import { ModalService, StorageService } from "@environment-services-lib";
import { Router } from "@angular/router";
import { RoutesHelper } from "../../../core/utils/routes.helper";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from "ng-zorro-antd/form";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { StorageKeys } from "../../../core/utils/storage-keys";
import { switchMap } from "rxjs";

@Component({
  selector: 'tga-password-settings',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzIconDirective,
    NzSwitchComponent,
    SectionPanelComponent,
    SectionsComponent,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormDirective,
    NzFormLabelComponent,
    NzFormControlComponent
  ],
  templateUrl: './password-settings.component.html',
  styleUrl: './password-settings.component.less'
})
export class PasswordSettingsComponent implements OnInit {

  biometryAccessControl = new FormControl();
  isPasswordAvailable = false;

  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService,
    private readonly modalService: ModalService,
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef
  ) {
  }

  ngOnInit() {
    this.storageService.getItem(StorageKeys.AppBiometryAccess)
      .subscribe(value => {
        if (value == null) {
          this.biometryAccessControl.setValue(false, { emitEvent: false });
          return;
        }

        this.biometryAccessControl.setValue(JSON.parse(value) as boolean, { emitEvent: false });
      });

    this.storageService.getItem(StorageKeys.AppPassword)
      .subscribe(pass => {
        if (pass == null) {
          return;
        }

        this.isPasswordAvailable = JSON.parse(pass) != null;
      })

    this.biometryAccessControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {
        this.storageService.setItem(StorageKeys.AppBiometryAccess, (value ?? false).toString())
          .subscribe();
      });
  }

  changePassword() {
    RoutesHelper.openFromRoot(this.router, RoutesHelper.appRoutes.authentication.createPassword)
  }

  turnOffPassword() {
    this.storageService.setItem(StorageKeys.AppPassword, JSON.stringify(null))
      .pipe(
        switchMap(() => this.modalService.showMessage('Пароль успешно сброшен'))
      )
      .subscribe(() => {
        this.isPasswordAvailable = false;
        this.cdr.detectChanges();
      });
  }
}
