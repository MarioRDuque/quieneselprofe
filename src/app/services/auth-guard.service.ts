import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    canLoad(route: Route): boolean {
        let url = `/${route.path}`;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkLogin(url: string): boolean {
        if (this.hayToken()) {
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }

    getObjetoJWT(): any {
        let dataJWT: string = localStorage.getItem("currentUser");
        if (dataJWT) {
            let objJWT = JSON.parse(localStorage.getItem("currentUser"));
            return objJWT;
        } else {
            return null;
        }
    };

    hayToken(): boolean {
        let objJWT = this.getObjetoJWT();
        if (objJWT !== null) {
            return true;
        } else {
            return false;
        }
    };

}
