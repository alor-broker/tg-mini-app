import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { NzButtonComponent } from "ng-zorro-antd/button";
import { NzDrawerComponent, NzDrawerContentDirective } from "ng-zorro-antd/drawer";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NzSwitchComponent } from "ng-zorro-antd/switch";
import { SectionPanelComponent } from "../../../core/components/sections/section-panel/section-panel.component";
import { SectionsComponent } from "../../../core/components/sections/sections/sections/sections.component";
import { BackButtonService, ModalService, StorageService } from "@environment-services-lib";
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
    NzDrawerComponent,
    NzIconDirective,
    NzSwitchComponent,
    SectionPanelComponent,
    SectionsComponent,
    NzDrawerContentDirective,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormDirective,
    NzFormLabelComponent,
    NzFormControlComponent
  ],
  templateUrl: './password-settings.component.html',
  styleUrl: './password-settings.component.less'
})
export class PasswordSettingsComponent implements OnInit, OnChanges {

  @Input() isOpened = false;
  @Output() onBackClicked = new EventEmitter();

  biometryAccessControl = new FormControl();
  isBackButtonAvailable = false;

  constructor(
    private readonly backButtonService: BackButtonService,
    private readonly router: Router,
    private readonly storageService: StorageService,
    private readonly modalService: ModalService,
    private readonly destroyRef: DestroyRef
  ) {
  }

  ngOnInit() {
    this.isBackButtonAvailable = this.backButtonService.isAvailable;

    this.storageService.getItem(StorageKeys.AppBiometryAccess)
      .subscribe(value => {
        if (value == null) {
          this.biometryAccessControl.setValue(false, { emitEvent: false });
          return;
        }

        this.biometryAccessControl.setValue(JSON.parse(value) as boolean, { emitEvent: false });
      });

    this.biometryAccessControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(value => {
        this.storageService.setItem(StorageKeys.AppBiometryAccess, (value ?? false).toString())
          .subscribe();
      });
  }

  ngOnChanges() {
    if (this.isOpened) {
      this.backButtonService.show();
      this.backButtonService.onClick(this.onBack);
    }
  }

  onBack = () => {
    this.backButtonService.hide();
    this.backButtonService.offClick(this.onBack);
    this.onBackClicked.emit();
  }

  changePassword() {
    RoutesHelper.openFromRoot(this.router, RoutesHelper.appRoutes.authentication.createPassword)
  }

  turnOffPassword() {
    this.storageService.setItem(StorageKeys.AppPassword, JSON.stringify(null))
      .pipe(
        switchMap(() => this.modalService.showMessage('Пароль успешно сброшен'))
      )
      .subscribe();
  }
}
