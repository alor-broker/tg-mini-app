import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioEvaluationComponent } from './portfolio-evaluation.component';

describe('PortfolioEvaluationComponent', () => {
  let component: PortfolioEvaluationComponent;
  let fixture: ComponentFixture<PortfolioEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioEvaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
