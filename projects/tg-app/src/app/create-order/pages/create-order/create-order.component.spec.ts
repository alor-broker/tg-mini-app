import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { CreateOrderComponent } from './create-order.component';
import { InstrumentsService } from "@api-lib";
import { Subject } from "rxjs";
import { CommonParametersService } from "../../sevices/commom-parameters/common-parameters.service";
import { TranslocoTestModuleProvider } from "../../../../testing-utils/transloco-test-module-provider";
import { MockProvider } from "ng-mocks";
import { BackButtonService } from "@environment-services-lib";

describe('CreateOrderComponent', () => {
  let component: CreateOrderComponent;
  let fixture: ComponentFixture<CreateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslocoTestModuleProvider.getModule(),
        CreateOrderComponent
      ],
      providers: [
        MockProvider(BackButtonService),
        {
          provide: InstrumentsService,
          useValue: {
            getInstrument: jasmine.createSpy('getInstrument').and.returnValue(new Subject())
          }
        },
        {
          provide: CommonParametersService,
          useValue: {
            reset: jasmine.createSpy('reset').and.callThrough(),
            setParameters: jasmine.createSpy('setParameters').and.callThrough(),
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
