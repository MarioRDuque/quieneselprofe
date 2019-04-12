import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { Suscriptor } from 'src/app/entidades/suscriptor';
import { LS } from 'src/app/constantes/app-constants';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiRequestService } from 'src/app/services/api-request.service';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.scss']
})
export class SuscripcionComponent implements OnInit {

  public suscriptor: Suscriptor = new Suscriptor();
  public resultadoApi: any = "";

  constructor(
    private utilService: UtilService,
    private toastr: ToastrService,
    private navegar: Router,
    private api: ApiRequestService
  ) { }

  ngOnInit() {
  }

  enviar(form: NgForm) {
    

    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (formularioTocado && form && form.valid) {
      this.api.post("suscripciones/guardar",this.suscriptor).
      then(data => {
        this.resultadoApi = data;
        console.log(this.resultadoApi);
        this.toastr.success(this.resultadoApi.operacionMensaje,this.resultadoApi.estadoOperacion);
      }).catch(err => {
        console.log(err);
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
