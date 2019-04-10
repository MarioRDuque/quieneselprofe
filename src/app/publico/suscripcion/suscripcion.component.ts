import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { Suscriptor } from 'src/app/entidades/suscriptor';
import { LS } from 'src/app/constantes/app-constants';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.scss']
})
export class SuscripcionComponent implements OnInit {


  suscriptor: Suscriptor = new Suscriptor();
  constructor(
    private utilService: UtilService,
    private toastr: ToastrService,
    private navegar: Router
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

    this.suscriptor.nombre="";
    this.suscriptor.apellido="";
    this.suscriptor.correo="";
    this.suscriptor.direccion="";
    this.suscriptor.facultad="";
    this.suscriptor.password="";
    this.suscriptor.codigoDoc="";
    this.toastr.warning("Los campos estan en blanco y sin valor","CLEAN")
  }
  salir(){
    this.toastr.info("Usted ha cancelado la suscripción","CANCELAR");
    this.navegar.navigate(['/docentes']);
  }

}
