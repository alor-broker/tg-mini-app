import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentIdeasComponent } from './investment-ideas.component';

describe('InvestmentIdeasComponent', () => {
  let component: InvestmentIdeasComponent;
  let fixture: ComponentFixture<InvestmentIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentIdeasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
