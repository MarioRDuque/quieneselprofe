import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LS } from '../constantes/app-constants';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
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
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    localStorage.clear();
  }

  ingresar() {
    if (this.usuario.usuario && this.usuario.contrasena) {
      this.cargando = true;
      this.authService.ingresar(this.usuario.usuario, this.usuario.contrasena);
      this.authService.getIsLogged$().subscribe(respuesta => {
        this.isLogged = respuesta;
        if (this.isLogged) {
          this.router.navigate(["modulos"]);
        } else {
          this.cargando = false;
        }
      });
    } else {
      this.toastr.warning(LS.MSJ_USUARIO_CLAVE_NO_INGRESADA, LS.TOAST_ADVERTENCIA);
    }
  }

  cambiarFilasTiempo(filas, tiempo) {
    this.cambio.emit({ filas: filas, tiempo: tiempo });
  }

}
