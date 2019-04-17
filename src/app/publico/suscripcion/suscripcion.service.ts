import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../services/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionService {
  constructor(private  api:ApiRequestService) { }
  obtenerFacultades(contexto){
    this.api.get("listardata/facultades").then(data=>{
      if (data && data.extraInfo){
        contexto.resultadoFacultad=data.extraInfo;
        console.log(data.extraInfo);
      }
    }).catch(err=>{
      contexto.cargando=false;
      console.log("error de mrd:" +err);
      
    });
  }
}