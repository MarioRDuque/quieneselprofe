import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from './api-request.service';
import { LS } from '../constantes/app-constants';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class AppSistemaService {

  public caminoC$ = new Subject<boolean>();

  constructor(
    public api: ApiRequestService,
    public toastr: ToastrService,
    public auth: AuthService
  ) { }

  getCaminoCambio$(): Observable<boolean> {
    return this.caminoC$.asObservable();
  }

  /**
   * Enviar notifcacion
   * @param parametro debe ser tipo {usuarioCorreo: "", notificacion:""}
   * Los correos son separados por ";"
*/
  enviarNotificacionUsuario(parametro, contexto, empresa) {
    this.api.post("todocompuWS/appWebController/enviarNotificacionCorreo", parametro)
      .then(data => {
        if (data && data.estadoOperacion === LS.KEY_EXITO) {
          this.toastr.success(data.operacionMensaje, LS.TOAST_CORRECTO);
        } else {
          contexto.cargando = false;
          this.toastr.warning(data.operacionMensaje, LS.TOAST_ADVERTENCIA);
        }
      })
      .catch(err => this.auth.handleError(err, contexto));
  }

  validarPermisoAccesoDirecto(menu, url): boolean {
    let index = -1; // si no existe la url en los menu
    let listaMenu = JSON.parse(localStorage.getItem(LS.KEY_CURRENT_MENU));
    listaMenu.forEach(element => {
      if (element.label === menu) {
        index = element.submenus.findIndex(item => item.id === url);
      }
    });
    return index !== -1;
  }

  getFechaActual(contexto, empresaSelect): Promise<any> {
    return this.api.post("todocompuWS/appWebController/getFechaActual", {})
      .then(data => {
        if (data && data.extraInfo) {
          return new Date(data.extraInfo);
        } else {
          this.toastr.warning(data.operacionMensaje, 'Aviso');
          return null;
        }
      }).catch(err => this.auth.handleError(err, contexto));
  }

  obtenerFechaActual(contexto, empresaSelect) {
    return this.api.post("todocompuWS/appWebController/getFechaActual", {})
      .then(data => {
        if (data && data.extraInfo) {
          contexto.despuesDeObtenerFechaActual(data.extraInfo);
        }
      }).catch(err => this.auth.handleError(err, contexto));
  }

  getFechaInicioFinMes(contexto, empresaSelect): Promise<any> {
    return this.api.post("todocompuWS/appWebController/getFechaInicioFinMes", {})
      .then(data => {
        if (data && data.extraInfo && data.extraInfo.length > 1) {
          return [new Date(data.extraInfo[0]), new Date(data.extraInfo[1])];
        } else {
          this.toastr.warning(data.operacionMensaje, 'Aviso');
          return [new Date(), new Date()];
        }
      }).catch(err => this.auth.handleError(err, contexto));
  }

  getFechaInicioActualMes(contexto, empresaSelect): Promise<any> {
    return this.api.post("todocompuWS/appWebController/getFechaInicioActualMes", {})
      .then(data => {
        if (data && data.extraInfo && data.extraInfo.length > 1) {
          return [new Date(data.extraInfo[0]), new Date(data.extraInfo[1])];
        } else {
          this.toastr.warning(data.operacionMensaje, 'Aviso');
          return [new Date(), new Date()];
        }
      }).catch(err => this.auth.handleError(err, contexto));
  }

  obtenerFechaServidor(contexto, empresaSelect) {
    this.api.post("todocompuWS/appWebController/getFechaActual", {})
      .then(data => {
        if (data && data.extraInfo) {
          contexto.despuesDeObtenerFechaServidor(data.extraInfo);
        }
        contexto.cargando = false;
      }
      ).catch(err => this.auth.handleError(err, contexto));
  }

}
