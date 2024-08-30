import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { BackButtonServiceSpy } from "../../../../testing-utils/back-button-service-spy";
import { TranslocoTestModuleProvider } from "../../../../testing-utils/transloco-test-module-provider";

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomePageComponent,
        TranslocoTestModuleProvider.getModule()
      ],
      providers:[
        BackButtonServiceSpy.getSpy().provider
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
