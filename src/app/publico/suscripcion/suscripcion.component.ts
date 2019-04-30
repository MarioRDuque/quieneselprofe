import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Suscriptor } from '../../entidades/suscriptor';
import { UtilService } from '../../services/util.service';
import { ApiRequestService } from '../../services/api-request.service';
import { LS } from '../../constantes/app-constants';
import { Facultad } from '../../entidades/facultad';
import { SuscripcionService } from './suscripcion.service';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.scss']
})
export class SuscripcionComponent implements OnInit {

  public suscriptor: Suscriptor = new Suscriptor();
  public resultadoApi: any = "";
  public resultadoFacultad: Array<Facultad> = new Array();
  cargando: boolean = false;

  constructor(
    private utilService: UtilService,
    private toastr: ToastrService,
    private navegar: Router,
    private api: ApiRequestService,
<<<<<<< HEAD
    private _suscripcionService:SuscripcionService
=======
    private suscripcionService: SuscripcionService
>>>>>>> 324ebec8edca85a7f4e5590b9314e545b89f568d
  ) { }

  ngOnInit() {
    this.obtenerFacultades();
  }
<<<<<<< HEAD
  obtenerFacultades(){
    this.cargando=true;
    this._suscripcionService.obtenerFacultades(this);
=======
  obtenerFacultades() {
    this.cargando = true;
    this.suscripcionService.obtenerFacultades(this);
    /*
    this.api.get("facultades/listar").then(data => {
      if (data && data.extraInfo) {
        this.resultadoFacultad = data.extraInfo;
        this.cargando=false;
      }
    }).catch(err => {
      console.log(err);
      this.cargando=false;
    });
*/
>>>>>>> 324ebec8edca85a7f4e5590b9314e545b89f568d
  }
  enviar(form: NgForm) {
    this.suscriptor.pendienteAprob="V";
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (formularioTocado && form && form.valid) {
      this._suscripcionService.solicitarSuscripcion(this);
    } else {
      this.toastr.error(LS.MSJ_CAMPOS_INVALIDOS, LS.MSJ_TITULO_INVALIDOS);
    }
  }

  limpiar() {
    this.suscriptor = new Suscriptor();
    this.toastr.warning("Los campos estan en blanco y sin valor", "CLEAN")
  }

  salir() {
    this.toastr.info("Usted ha cancelado la suscripción", "CANCELAR");
    this.navegar.navigate(['/docentes']);
  }
<<<<<<< HEAD
//metodos especiales de las peticiones:
 
=======
  //metodos especiales de las peticiones:
  despuesDeObtenerFacultades(data) {
    this.cargando = false;
    this.resultadoFacultad = data.extraInfo;

  }
>>>>>>> 324ebec8edca85a7f4e5590b9314e545b89f568d
}
