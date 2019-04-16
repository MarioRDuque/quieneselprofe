import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiRequestService } from './api-request.service';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  fechaServidor: any;

  constructor(
    public api: ApiRequestService,
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
}
