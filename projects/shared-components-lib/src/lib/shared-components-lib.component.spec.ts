import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedComponentsLibComponent } from './shared-components-lib.component';

describe('SharedComponentsLibComponent', () => {
  let component: SharedComponentsLibComponent;
  let fixture: ComponentFixture<SharedComponentsLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedComponentsLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedComponentsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
