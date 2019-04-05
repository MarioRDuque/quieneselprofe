import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { Suscriptor } from 'src/app/entidades/suscriptor';
import { LS } from 'src/app/constantes/app-constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.scss']
})
export class SuscripcionComponent implements OnInit {


  suscriptor: Suscriptor = new Suscriptor();
  constructor(
    private utilService: UtilService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  enviar(form: NgForm){
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (formularioTocado && form && form.valid) {
      
    } else {
      this.toastr.error(LS.MSJ_CAMPOS_INVALIDOS, LS.MSJ_TITULO_INVALIDOS);
    }
  }

  limpiar(){

  }

}
