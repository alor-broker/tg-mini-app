import { Router } from "@angular/router";

export class RoutesHelper {
  static appRoutes = {
    home: 'home',
    settings: 'settings',
    authentication: {
      unlock: 'unlock',
      createPassword: 'password-create'
    }
  }

  static openFromRoot(router: Router, route: string): void {
    router.navigate([this.urlForRoot(route)])
  }

  static urlForRoot(route: string): string {
    return `/${route}`
  }
}
