import { Router } from "@angular/router";

export class RoutesHelper {
  static appRoutes = {
    home: 'home',
    settings: 'settings',
    authentication: {
      createPassword: 'password-create',
      unlock: 'unlock'
    }
  }

  static openFromRoot(router: Router, route: string): void {
    router.navigate([this.urlForRoot(route)])
  }

  static urlForRoot(route: string): string {
    return `/${route}`
  }
}
