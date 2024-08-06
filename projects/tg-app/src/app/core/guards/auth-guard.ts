import {
  ActivatedRouteSnapshot,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { UserStateService } from "../services/user-state.service";
import { inject } from "@angular/core";
import {
  map,
  switchMap,
  take
} from "rxjs";
import { RoutesHelper } from "../utils/routes.helper";
import { ApiTokenProviderService } from "../services/api-token-provider.service";

export class AuthGuard {
  static canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const userStateService = inject(UserStateService);
    const apiTokenProviderService = inject(ApiTokenProviderService);
    const router = inject(Router);

    return apiTokenProviderService.apiToken$
      .pipe(
        switchMap(() => userStateService.state$),
        map(state => {
          if(state != null && state.user != null && state.ssoToken != null) {
            return true;
          }

          return router.parseUrl(RoutesHelper.urlForRoot(RoutesHelper.appRoutes.home))
        }),
        take(1)
      )
  }
}
