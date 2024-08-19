import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitOrderButtonsComponent } from './submit-order-buttons.component';

describe('SubmitOrderButtonsComponent', () => {
  let component: SubmitOrderButtonsComponent;
  let fixture: ComponentFixture<SubmitOrderButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitOrderButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitOrderButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
