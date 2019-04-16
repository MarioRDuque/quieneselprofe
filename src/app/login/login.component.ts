import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LS } from '../constantes/app-constants';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() cambio = new EventEmitter();
  cargando: boolean = false;
  constantes: any = LS;
  usuario: any = {};
  isLogged: boolean;
  isLogged$: Observable<boolean>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private utilService: UtilService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    localStorage.clear();
  }

  ingresar(form: NgForm) {
    this.cargando = true;
    let formularioTocado = this.utilService.establecerFormularioTocado(form);
    if (form && form.valid && formularioTocado) {
      if (this.usuario.usuario && this.usuario.contrasena) {
        this.authService.ingresar(this.usuario.usuario, this.usuario.contrasena, this);
      } else {
        this.toastr.warning(LS.MSJ_USUARIO_CLAVE_NO_INGRESADA, LS.TOAST_ADVERTENCIA);
        this.cargando = false;
      }
    } else {
      this.toastr.error(LS.MSJ_CAMPOS_INVALIDOS, LS.MSJ_TITULO_INVALIDOS);
      this.cargando = false;
    }
  }

  logueoCorrecto() {
    this.router.navigate(["modulos"]).then(() => {
    });
  }

  cambiarFilasTiempo(filas, tiempo) {
    this.cambio.emit({ filas: filas, tiempo: tiempo });
  }

}
