import { Component } from '@angular/core';
import { LinksService } from "@environment-services-lib";
import { environment } from "../../../../environments/environment";
import { NzIconDirective } from "ng-zorro-antd/icon";

@Component({
  selector: 'tga-links',
  standalone: true,
  imports: [
    NzIconDirective
  ],
  templateUrl: './links.component.html',
  styleUrl: './links.component.less'
})
export class LinksComponent {
  readonly externalLinks = environment.externalLinks;

  constructor(private readonly linksService: LinksService) {
  }

  openInBrowser(url: string): void {
    this.linksService.openBrowserLink(url);
  }

  openInApplication(url: string): void {
    this.linksService.openApplicationLink(url);
  }
}
