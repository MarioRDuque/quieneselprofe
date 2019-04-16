import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from './api-request.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  fechaServidor: any;

  constructor(
    public api: ApiRequestService,
    private router: Router,
    public toastr: ToastrService
  ) {
  }

  establecerFormularioTocado(form: NgForm): boolean {
    let touched = true;
    let formControls = form.form.controls;
    for (let element in formControls) {
      form.controls[element].markAsTouched();
      form.controls[element].updateValueAndValidity();
    }
    return touched;
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

}
