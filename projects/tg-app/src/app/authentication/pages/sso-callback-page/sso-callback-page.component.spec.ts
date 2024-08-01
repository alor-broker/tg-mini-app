import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoCallbackPageComponent } from './sso-callback-page.component';

describe('SsoCallbackPageComponent', () => {
  let component: SsoCallbackPageComponent;
  let fixture: ComponentFixture<SsoCallbackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SsoCallbackPageComponent]
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
