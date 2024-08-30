import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePasswordPageComponent } from './create-password-page.component';
import { TranslocoTestModuleProvider } from "../../../../testing-utils/transloco-test-module-provider";
import { StorageServiceSpy } from "../../../../testing-utils/storage-service-spy";
import { BiometryServiceSpy } from "../../../../testing-utils/biometry-service-spy";
import { HapticFeedbackServiceSpy } from "../../../../testing-utils/haptic-feedback-service-spy";

describe('CreatePasswordPageComponent', () => {
  let component: CreatePasswordPageComponent;
  let fixture: ComponentFixture<CreatePasswordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreatePasswordPageComponent,
        TranslocoTestModuleProvider.getModule()
      ],
      providers: [
        StorageServiceSpy.getSpy().provider,
        BiometryServiceSpy.getSpy().provider,
        HapticFeedbackServiceSpy.getSpy().provider
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
