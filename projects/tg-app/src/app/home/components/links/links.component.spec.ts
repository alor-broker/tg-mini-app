import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksComponent } from './links.component';
import { LinksServiceSpy } from "../../../../testing-utils/links-service-spy";
import { TranslocoTestModuleProvider } from "../../../../testing-utils/transloco-test-module-provider";
import { NzIconModule } from "ng-zorro-antd/icon";
import { provideHttpClient } from "@angular/common/http";

describe('LinksComponent', () => {
  let component: LinksComponent;
  let fixture: ComponentFixture<LinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LinksComponent,
        TranslocoTestModuleProvider.getModule(),
        NzIconModule
      ],
      providers: [
        LinksServiceSpy.getSpy().provider,
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
