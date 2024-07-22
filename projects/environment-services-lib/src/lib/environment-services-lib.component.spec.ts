import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentServicesLibComponent } from './environment-services-lib.component';

describe('EnvironmentServicesLibComponent', () => {
  let component: EnvironmentServicesLibComponent;
  let fixture: ComponentFixture<EnvironmentServicesLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvironmentServicesLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironmentServicesLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
