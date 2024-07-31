import { Routes } from '@angular/router';
import { RoutesHelper } from "./core/utils/routes.helper";
import { HomePageComponent } from "./home/pages/home-page/home-page.component";
import { AuthGuard } from "./core/guards/auth-guard";

export const routes: Routes = [
  {
    // TODO: поменять на нормальный роут после настройки ССО
    path: 'auth/sso',
    loadComponent: () => import('./pages/auth/components/auth/auth.component').then(mod => mod.AuthComponent)
  },
  {
    path: 'identification',
    loadComponent: () => import('./pages/identification/components/identification/identification.component').then(mod => mod.IdentificationComponent)
  },
  {
    path: 'password-create',
    loadComponent: () => import('./pages/identification/components/password-create/password-create.component').then(mod => mod.PasswordCreateComponent)
  },
  {
    path: RoutesHelper.appRoutes.home,
    component: HomePageComponent,
    canActivate: [AuthGuard.canActivate]
  },
  {
    path: '',
    redirectTo: '/identification',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/identification'
  }
];
