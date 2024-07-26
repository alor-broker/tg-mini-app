import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiTokenProviderService } from "../../../../core/services/api-token-provider.service";

@Component({
  selector: 'tga-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.less'
})
export class AuthComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly apiTokenProviderService: ApiTokenProviderService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.apiTokenProviderService.setRefreshToken(params['refreshToken']?.trim(), () => {
        this.router.navigate(['/identification']);
      });
    });
  }
}
