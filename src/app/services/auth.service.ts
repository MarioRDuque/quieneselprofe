import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LS } from '../constantes/app-constants';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { ApiRequestService } from './api-request.service';
import { ToastrService } from 'ngx-toastr';

export interface ObjetoJWT {
    userId: string;
    token: string;
    nombrecompleto: string;
    codigo: string;
    email: string;
}

export interface AuthRespuesta {
    success: boolean;
    mensaje: string;
    urlDestino: string;
    user?: ObjetoJWT;
}

@Injectable()
export class AuthService {

    private isLogged$ = new Subject<boolean>();
    private menuC$ = new Subject<boolean>();

    constructor(
        private router: Router,
        private apiRequest: ApiRequestService,
        private toastr: ToastrService
    ) { }

    ingresar(username: string, password: string) {
        let bodyData = {
            'username': username,
            'password': password
        };
        this.apiRequest.login('session', bodyData, null)
            .then(
                jsonResp => {
                    if (jsonResp && jsonResp.item && jsonResp.estadoOperacion === "EXITO") {
                        let user = {
                            "userId": jsonResp.item.usuarioId,
                            "token": jsonResp.item.token,
                            "nombrecompleto": jsonResp.item.nombrecompleto,
                            "codigo": jsonResp.item.codigo,
                            "email": jsonResp.item.email
                        };
                        localStorage.setItem(LS.KEY_CURRENT_USER, JSON.stringify(user));
                        localStorage.setItem("locationPathName", location.pathname);
                        if (jsonResp.iniciales) {
                            localStorage.setItem(LS.KEY_SISINFOTO, JSON.stringify(jsonResp.sisInfoTO));
                            localStorage.setItem(LS.KEY_DATOS_INICIALES, JSON.stringify(jsonResp.iniciales));
                            localStorage.setItem(LS.KEY_NOTIFICACIONES, JSON.stringify(jsonResp.notificaciones));
                            localStorage.setItem(LS.KEY_FOTO_PERFIL, JSON.stringify(jsonResp.iniciales && jsonResp.iniciales.usuario ? jsonResp.iniciales.usuario.imagen : ""));
                            this.isLogged$.next(true);
                        } else {
                            this.router.navigate(['/cambiarclave']);
                        }
                    } else {
                        this.toastr.error(jsonResp.operacionMensaje, LS.TOAST_ERROR);
                        this.cerrarSession();
                        this.isLogged$.next(false);
                    }
                })
            .catch(err => {
                this.isLogged$.next(false);
                this.handleError(err, this);
            });
    }

    handleError(error: any, contexto) {
        switch (error.status) {
          case 401:
          case 403:
            this.toastr.warning('No autorizado', 'Aviso');
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(['login']);
            break;
          case 404:
            this.toastr.warning('página solicitada no se encuentra', 'Aviso');
            break;
          case 0:
            this.toastr.warning("No hay conexión con el servidor.", 'Aviso');
            break;
          default:
            this.toastr.error(error.message || error, 'Error');
            break;
        }
        contexto.cargando = false;
      }

    getIsLogged$(): Observable<boolean> {
        return this.isLogged$.asObservable();
    }

    getMenuCambio$(): Observable<boolean> {
        return this.menuC$.asObservable();
    }

    cerrarSession(): void {
        localStorage.clear();
        sessionStorage.clear();
        this.router.navigate(["/login"]);/* ir al backend y caducar token */
    }

    getUserName(): string {
        let objJWT: ObjetoJWT = JSON.parse(localStorage.getItem(LS.KEY_CURRENT_USER));
        if (objJWT !== null) {
            return objJWT.userId
        }
        return "no-user";
    }

    getNombrecompleto(): string {
        let objJWT: ObjetoJWT = JSON.parse(localStorage.getItem(LS.KEY_CURRENT_USER));
        if (objJWT !== null && objJWT.nombrecompleto && objJWT.nombrecompleto !== " ") {
            return objJWT.nombrecompleto
        } else {
            return objJWT ? objJWT.userId : "";
        }
    }

    getCodigoUser(): string {
        let objJWT = JSON.parse(localStorage.getItem(LS.KEY_CURRENT_USER));
        if (objJWT !== null) {
            return objJWT.codigo;
        }
        return null;
    }

    getEmailUser(): string {
        let objJWT = JSON.parse(localStorage.getItem(LS.KEY_CURRENT_USER));
        if (objJWT !== null) {
            return objJWT.email;
        }
        return null;
    }

    getImagenUser(): string {
        let objJWT = JSON.parse(localStorage.getItem(LS.KEY_FOTO_PERFIL));
        if (objJWT) {
            return "data:image/jpeg;base64," + objJWT;
        }
        return "assets/images/user.png";
    }

    eliminarDataJWT() {
        localStorage.removeItem(LS.KEY_CURRENT_USER);
    }

    guardarDataJWT(dataJWT: string) {
        localStorage.setItem(LS.KEY_CURRENT_USER, dataJWT);
    }

    getObjetoJWT(): ObjetoJWT {
        let dataJWT: string = localStorage.getItem(LS.KEY_CURRENT_USER);
        if (dataJWT) {
            let objJWT: ObjetoJWT = JSON.parse(localStorage.getItem(LS.KEY_CURRENT_USER));
            return objJWT;
        } else {
            return null;
        }
    };

    hayToken(): boolean {
        let objJWT: ObjetoJWT = this.getObjetoJWT();
        if (objJWT !== null) {
            return true;
        } else {
            return false;
        }
    };

    getToken(): string {
        let objJWT: ObjetoJWT = this.getObjetoJWT();
        if (objJWT !== null) {
            return objJWT.token;
        }
        return null;
    };

    getModulos(): any {
        let objJWT = JSON.parse(localStorage.getItem(LS.KEY_DATOS_INICIALES));
        if (objJWT !== null) {
            let modulosGen = objJWT.modulos;
            for (let menu of modulosGen) {
                menu.label = menu.label.replace("WEB ", "");
            }
            return modulosGen;
        }
        return null;
    };

    getModulo(url): any {
        let objJWT = JSON.parse(localStorage.getItem(LS.KEY_DATOS_INICIALES));
        if (objJWT !== null && objJWT.modulos) {
            for (let i = 0; i < objJWT.modulos.length; i++) {
                if (objJWT.modulos[i].url == url) {
                    return objJWT.modulos[i];
                }
            }
        }
        return null;
    };

    getMenuVista() {
        this.menuC$.next(true);
    }

    getMenus(url): any {
        let objJWT = this.getModulo(url);
        if (objJWT !== null) {
            localStorage.setItem(LS.KEY_CURRENT_MENU, JSON.stringify(objJWT.menus));
            this.menuC$.next(true);
        }
    };

}
