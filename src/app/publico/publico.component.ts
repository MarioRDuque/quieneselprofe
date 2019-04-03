import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { Router } from '@angular/router';
import {Carousel} from '../entidades/carousel';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.scss']
})
export class PublicoComponent implements OnInit {

  images: Array<Carousel> = new Array();
  constructor(
    public modalService: NgbModal,
    private _scrollToService: ScrollToService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
     this.images=this.cargarCarousel();
  }

  abrirLogin(): void {
    this.router.navigate(["modulos"]);
  }

  cargarCarousel():Array<Carousel>{
    
    return [
      {
          imagen: "../../../../assets/img/welcome/carrucel-1.png",
          descripcion:'crea tu perfil y hazle saber a tu comunidad la importancia de estar conectados.',
          titulo:'Sistema de Interactividad Educativa Universitaria',
          claseImagen:'col-md-7 text-center',
          claseText: 'col-md-5 text-right'
      },
      {
          imagen: "../../../../assets/img/welcome/carrucel-2.png",
          descripcion: 'Comparte el mejor contenido de materias online.Interactivo y fácil acceso al sistema.Gestiona desde cualquier dispositivo.',
          titulo:'Sistema de Interactividad Educativa Universitaria',
          claseImagen:'col-md-7 text-center',
          claseText: 'col-md-5 text-lef'
      },
       {
          imagen:"../../../../assets/img/welcome/carrucel-3.png",
          descripcion: 'Ubica a tu docente de manera directa entrando a su perfil. Adelanta temas de estudio.Sugiere post.Postea y haste fan.',
          titulo:'Lo que aquí encontrarás',
          claseImagen:'col-md-7 text-center',
          claseText: 'col-md-5 text-right'
      }
    ]
  }

  public triggerScrollTo(destino: string) {
    const config: ScrollToConfigOptions = {
      target: destino
    };
    this._scrollToService.scrollTo(config);
  }

}
