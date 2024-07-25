import { Component } from '@angular/core';
import { AuthService } from "../../../auth/services/auth/auth.service";

@Component({
  selector: 'tga-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.less'
})
export class MainComponent {

  constructor(
    private readonly authService: AuthService
  ) {
  }

  onLogout() {
    this.authService.logout();
  }
}
