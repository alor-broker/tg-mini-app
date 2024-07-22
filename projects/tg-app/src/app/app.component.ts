import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplicationProviders } from "./application-providers";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  providers: [...ApplicationProviders]
})
export class AppComponent {
  title = 'tg-app';
}
