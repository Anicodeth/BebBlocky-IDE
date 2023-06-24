import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { BridgeService } from "../services/bridge.service";

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
    constructor(private router: Router, private bridgeService: BridgeService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |
        UrlTree {
        // returns `true` if the user is logged in or redirects to the login page
        // note that you can also use `router.createUrlTree()` to build a `UrlTree` with parameters
        return this.bridgeService.isLoggedIn() || this.router.parseUrl('/login');
    }
}