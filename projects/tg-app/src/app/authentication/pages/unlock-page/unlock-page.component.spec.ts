import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockPageComponent } from './unlock-page.component';

describe('UnlockPageComponent', () => {
  let component: UnlockPageComponent;
  let fixture: ComponentFixture<UnlockPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnlockPageComponent]
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
