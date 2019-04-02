import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfig } from './app-config';
import { LS } from '../constantes/app-constants';
import { Router } from '@angular/router';

export interface ObjetoJWT {
    userId: string;
    token: string;
}

@Injectable()
export class ApiRequestService {

    constructor(
        private appConfig: AppConfig,
        private http: HttpClient,
        private router: Router
    ) { }

    appendAuthHeader(): HttpHeaders {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });
        let objJWT: ObjetoJWT = JSON.parse(localStorage.getItem(LS.KEY_CURRENT_USER));
        if (objJWT !== null) {
            let token = objJWT.token;
            if (token !== null) {
                headers.append("Authorization", token);
            }
        }
        return headers;
    }

    getRequestOptions(empresa: string, urlParam?: HttpParams, body?: Object): any {
        let options = {
            headers: this.appendAuthHeader()
        };
        if (urlParam) {
            options['params'] = urlParam ;
        }
        if (body) {
            body["sisInfoTO"] = JSON.parse(localStorage.getItem(LS.KEY_SISINFOTO));
            body["sisInfoTO"] ? body["sisInfoTO"].empresa = empresa : null;
            options['body'] = JSON.stringify(body);
        }
        return options;
    }

    //PARAMETRO EMPRESA ES LA EMPRESA SELECCIONADA PARA REALIZAR LA OPERACION
    get(url: string, empresa: string, urlParams?: HttpParams): Promise<any> {
        if (this.hayTiempoSession()) {
            localStorage.setItem(LS.KEY_TIEMPO_SESION, "" + new Date().getTime());
            let requestOptions = this.getRequestOptions(empresa, urlParams);
            return this.http.request('GET', this.appConfig.baseApiPath + url, requestOptions)
                .toPromise()
                .then(resp => resp)
                .catch(err => this.handleError(err));
        } else {
            this.cerrarSession();
        }
    }

    //PARAMETRO EMPRESA ES LA EMPRESA SELECCIONADA PARA REALIZAR LA OPERACION
    post(url: string, body: Object, empresa: string): Promise<any> {
        if (this.hayTiempoSession()) {
            localStorage.setItem(LS.KEY_TIEMPO_SESION, "" + new Date().getTime());
            let requestOptions = this.getRequestOptions(empresa, undefined, body);
            return this.http.request('POST', this.appConfig.baseApiPath + url, requestOptions)
                .toPromise()
                .then(resp => resp)
                .catch(err => this.handleError(err));
        } else {
            this.cerrarSession();
        }
    }

    //login
    login(url: string, body: Object, empresa: string): Promise<any> {
        localStorage.setItem(LS.KEY_TIEMPO_SESION, "" + new Date().getTime());
        let requestOptions = this.getRequestOptions(empresa, undefined, body);
        return this.http.request('POST',this.appConfig.baseApiPath + url, requestOptions)
            .toPromise()
            .then(resp => resp)
            .catch(err => this.handleError(err));
    }

    //PARAMETRO EMPRESA ES LA EMPRESA SELECCIONADA PARA REALIZAR LA OPERACION
    put(url: string, body: Object, empresa: string): Promise<any> {
        if (this.hayTiempoSession()) {
            localStorage.setItem(LS.KEY_TIEMPO_SESION, "" + new Date().getTime());
            let requestOptions = this.getRequestOptions(empresa, undefined, body);
            return this.http.request('PUT', this.appConfig.baseApiPath + url, requestOptions)
                .toPromise()
                .then(resp => resp)
                .catch(err => this.handleError(err));
        } else {
            this.cerrarSession();
        }
    }

    //PARAMETRO EMPRESA ES LA EMPRESA SELECCIONADA PARA REALIZAR LA OPERACION
    delete(url: string, empresa: string): Promise<any> {
        if (this.hayTiempoSession()) {
            localStorage.setItem(LS.KEY_TIEMPO_SESION, "" + new Date().getTime());
            let requestOptions = this.getRequestOptions(empresa);
            return this.http.request('DELETE', this.appConfig.baseApiPath + url, requestOptions)
                .toPromise()
                .then(resp => resp)
                .catch(err => this.handleError(err));
        } else {
            this.cerrarSession();
        }
    }

    handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    hayTiempoSession() {
        if (localStorage.getItem("locationPathName") != location.pathname) {
            console.log("diferentes");
            return false;
        }
        let fecha = localStorage.getItem(LS.KEY_TIEMPO_SESION);
        if (new Date().getTime() - Number(fecha) > 9000000) {
            return false;
        } else {
            return true;
        }
    }

    cerrarSession() {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(["/login"]);
        location.reload();
    }
}
