import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockPageComponent } from './unlock-page.component';
import { TranslocoTestModuleProvider } from "../../../../testing-utils/transloco-test-module-provider";
import { BiometryServiceSpy } from "../../../../testing-utils/biometry-service-spy";
import { StorageServiceSpy } from "../../../../testing-utils/storage-service-spy";
import { BackButtonServiceSpy } from "../../../../testing-utils/back-button-service-spy";
import { HapticFeedbackServiceSpy } from "../../../../testing-utils/haptic-feedback-service-spy";
import { ApiTokenProviderService } from "../../../core/services/api-token-provider.service";
import { Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";

describe('UnlockPageComponent', () => {
  let component: UnlockPageComponent;
  let fixture: ComponentFixture<UnlockPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UnlockPageComponent,
        TranslocoTestModuleProvider.getModule()
      ],
      providers:[
        BiometryServiceSpy.getSpy().provider,
        StorageServiceSpy.getSpy().provider,
        BackButtonServiceSpy.getSpy().provider,
        HapticFeedbackServiceSpy.getSpy().provider,
        {
          provide: ApiTokenProviderService,
          useValue: {
            apiToken$: new Subject(),
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: new Subject()
          }
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnlockPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
