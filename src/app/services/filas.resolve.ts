import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { LS } from '../constantes/app-constants';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class FilasResolve implements Resolve<any> {

    private filasC$ = new Subject<boolean>();
    private tiempoC$ = new Subject<boolean>();

    constructor() { }

    resolve() {
        localStorage.setItem(LS.KEY_CURRENT_FILAS, "0");
        localStorage.setItem(LS.KEY_CURRENT_TIEMPO, "0");
        this.filasC$.next(true);
        this.tiempoC$.next(true);
    }

    getFilasCambio$(): Observable<boolean> {
        return this.filasC$.asObservable();
    }

    actualizarFilas(filasLongitud, tiempo?) {
        localStorage.setItem(LS.KEY_CURRENT_FILAS, filasLongitud);
        tiempo ? localStorage.setItem(LS.KEY_CURRENT_TIEMPO, tiempo) : localStorage.setItem(LS.KEY_CURRENT_TIEMPO, "0");
        this.filasC$.next(true);
    }

}
