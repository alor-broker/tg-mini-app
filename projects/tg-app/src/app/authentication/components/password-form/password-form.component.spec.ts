import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFormComponent } from './password-form.component';
import {
  MockProvider,
  MockService
} from "ng-mocks";
import {
  HapticFeedbackService,
  PlatformInfoService
} from "@environment-services-lib";
import { PlatformInfoServiceSpy } from "../../../../testing-utils/platform-info-service-spy";
import { HapticFeedbackServiceSpy } from "../../../../testing-utils/haptic-feedback-service-spy";
import { provideHttpClient } from "@angular/common/http";

describe('PasswordFormComponent', () => {
  let component: PasswordFormComponent;
  let fixture: ComponentFixture<PasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordFormComponent],
      providers: [
        provideHttpClient(),
        PlatformInfoServiceSpy.getSpy().provider,
        HapticFeedbackServiceSpy.getSpy().provider
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
