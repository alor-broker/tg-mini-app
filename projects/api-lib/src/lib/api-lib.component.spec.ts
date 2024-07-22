import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiLibComponent } from './api-lib.component';

describe('ApiLibComponent', () => {
  let component: ApiLibComponent;
  let fixture: ComponentFixture<ApiLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
