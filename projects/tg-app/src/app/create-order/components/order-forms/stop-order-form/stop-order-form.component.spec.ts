import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopOrderFormComponent } from './stop-order-form.component';

describe('StopOrderFormComponent', () => {
  let component: StopOrderFormComponent;
  let fixture: ComponentFixture<StopOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopOrderFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
