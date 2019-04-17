import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../services/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {
 private  api: ApiRequestService;
  
  constructor() { }
  obtenerFacultades(contexto){
    this.api.get("listardata/facultades").then(data=>{
      if (data && data.extraInfo){
        contexto.despuesDeObtenerFacultades(data.extraInfo.nombreFac);
        this.resultadoFacultad=data;
        console.log(this.resultadoFacultad.extraInfo[0].nombreFac);
      }
    }).catch(err=>{
      console.log(err);
    });
  }
}