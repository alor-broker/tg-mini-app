import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentIdeasPreviewComponent } from './investment-ideas-preview.component';

describe('InvestmentIdeasPreviewComponent', () => {
  let component: InvestmentIdeasPreviewComponent;
  let fixture: ComponentFixture<InvestmentIdeasPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentIdeasPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentIdeasPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
