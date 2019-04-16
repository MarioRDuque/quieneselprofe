import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Suscriptor } from '../../entidades/suscriptor';
import { UtilService } from '../../services/util.service';
import { ApiRequestService } from '../../services/api-request.service';
import { LS } from '../../constantes/app-constants';
import { Facultad } from '../../entidades/facultad';

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
    private api: ApiRequestService
  ) { }

  ngOnInit() {
    this.obtenerFacultades();
  }
  obtenerFacultades() {
    this.api.get("facultades/listar").then(data => {
      if (data && data.extraInfo) {
        this.resultadoFacultad = data.extraInfo;
      }
    }).catch(err => {
      console.log(err);
    });
  }
  enviar(form: NgForm) {


    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (formularioTocado && form && form.valid) {
      this.cargando = true;
      this.api.post("suscripciones/guardar", this.suscriptor).
        then(data => {
          if (data && data.extraInfo) {
            this.resultadoApi = data;
            console.log(this.resultadoApi);
            this.toastr.success(this.resultadoApi.operacionMensaje, this.resultadoApi.estadoOperacion);
            this.suscriptor = new Suscriptor();
            this.cargando = false;
          } else {
            this.toastr.warning(data.operacionMensaje, LS.TAG_AVISO);
            this.cargando = false;
          }
        }).catch(err => {
          console.log(err);
          this.cargando = false;
          this.toastr.error(err, LS.TAG_ERROR);
        });
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

}
