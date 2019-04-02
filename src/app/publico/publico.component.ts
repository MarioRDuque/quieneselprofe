import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.scss']
})
export class PublicoComponent implements OnInit {

  images: Array<string> = new Array(3);
  constructor(
    public modalService: NgbModal,
    private _scrollToService: ScrollToService,
    private router: Router
  ) {
    this.images[0] = '../../../../assets/img/welcome/carrucel-1.png';
    this.images[1] = '../../../../assets/img/welcome/carrucel-2.png';
    this.images[2] = '../../../../assets/img/welcome/carrucel-3.png';
  }

  ngOnInit() {

  }

  abrirLogin(): void {
    this.router.navigate(["modulos"]);
  }

  public triggerScrollTo(destino: string) {
    const config: ScrollToConfigOptions = {
      target: destino
    };
    this._scrollToService.scrollTo(config);
  }

}
