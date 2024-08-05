import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCheckComponent } from './password-check.component';

describe('PasswordCheckComponent', () => {
  let component: PasswordCheckComponent;
  let fixture: ComponentFixture<PasswordCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
