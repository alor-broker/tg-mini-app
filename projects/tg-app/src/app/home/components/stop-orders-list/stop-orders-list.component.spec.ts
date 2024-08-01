import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopOrdersListComponent } from './stop-orders-list.component';

describe('StopOrdersListComponent', () => {
  let component: StopOrdersListComponent;
  let fixture: ComponentFixture<StopOrdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopOrdersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
