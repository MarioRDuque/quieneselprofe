import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../services/api-request.service';
import { Suscriptor } from '../../entidades/suscriptor';
import { LS } from '../../constantes/app-constants';
@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {
  constructor(private api: ApiRequestService) { }
  obtenerFacultades(contexto) {
    this.api.get("facultades/listar").then(data => {
      if (data && data.extraInfo) {
        contexto.resultadoFacultad = data.extraInfo;
<<<<<<< HEAD
        contexto.cargando = false;
      }
    }).catch(err => {
      contexto.cargando = false;
    });
  }
  //solicitar inscripciones:
  solicitarSuscripcion(contexto) {
    contexto.cargando = true;
    this.api.post("suscripciones/guardar", contexto.suscriptor).
      then(data => {
        if (data && data.extraInfo) {
          contexto.resultadoApi = data;
          contexto.toastr.success(contexto.resultadoApi.operacionMensaje, contexto.resultadoApi.estadoOperacion);
          contexto.suscriptor = new Suscriptor();
          contexto.cargando = false;
        } else {
          contexto.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
          contexto.cargando = false;
        }
      }).catch(err => {
        console.log(err);
        contexto.cargando = false;
        contexto.toastr.error(err, LS.TAG_ERROR);
      });
  }
}
=======
        console.log(data.extraInfo);
      }
      contexto.cargando = false;
    }).catch(err => {
      contexto.cargando = false;
      console.log("error de mrd:" + err);

    });
  }
}
>>>>>>> 324ebec8edca85a7f4e5590b9314e545b89f568d
