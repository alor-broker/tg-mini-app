import { ChangeDetectorRef, Component, Input, OnChanges } from '@angular/core';
import { NzIconDirective } from "ng-zorro-antd/icon";

@Component({
  selector: 'tga-page-loader',
  standalone: true,
  imports: [
    NzIconDirective
  ],
  templateUrl: './page-loader.component.html',
  styleUrl: './page-loader.component.less'
})
export class PageLoaderComponent implements OnChanges {
  @Input({ required: true }) isVisible!: boolean;

  constructor(
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngOnChanges() {
    this.cdr.detectChanges();
  }
}
