import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSettingsComponent } from './password-settings.component';
import { StorageServiceSpy } from "../../../../testing-utils/storage-service-spy";
import { ModalServiceSpy } from "../../../../testing-utils/modal-service-spy";
import { NzIconModule } from "ng-zorro-antd/icon";
import { TranslocoTestModuleProvider } from "../../../../testing-utils/transloco-test-module-provider";

describe('PasswordSettingsComponent', () => {
  let component: PasswordSettingsComponent;
  let fixture: ComponentFixture<PasswordSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PasswordSettingsComponent,
        NzIconModule,
        TranslocoTestModuleProvider.getModule()
      ],
      providers: [
        StorageServiceSpy.getSpy().provider,
        ModalServiceSpy.getSpy().provider
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
