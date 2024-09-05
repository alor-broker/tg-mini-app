import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoCallbackPageComponent } from './sso-callback-page.component';
import { ApiTokenProviderService } from "../../../core/services/api-token-provider.service";

describe('SsoCallbackPageComponent', () => {
  let component: SsoCallbackPageComponent;
  let fixture: ComponentFixture<SsoCallbackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsoCallbackPageComponent],
      providers:[
        {
          provide: ApiTokenProviderService,
          useValue: {
            setRefreshToken: jasmine.createSpy('setRefreshToken').and.callThrough()
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsoCallbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
