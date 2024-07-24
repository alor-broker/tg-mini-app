import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // TODO: поменять на нормальный роут после настройки ССО
    path: 'test-web-ap/auth/sso',
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
    path: 'main',
    loadComponent: () => import('./pages/main/components/main/main.component').then(mod => mod.MainComponent)
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
