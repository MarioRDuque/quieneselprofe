import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-publico',
  templateUrl: './publico.component.html',
  styleUrls: ['./publico.component.scss']
})
export class PublicoComponent implements OnInit {

  images: Array<string> = new Array(3);
  constructor(
    public modalService: NgbModal,
    private _scrollToService: ScrollToService
  ) {
    this.images[0] = '../../../../assets/img/welcome/carrucel-1.png';
    this.images[1] = '../../../../assets/img/welcome/carrucel-2.png';
    this.images[2] = '../../../../assets/img/welcome/carrucel-3.png';
  }

  ngOnInit() {

  }

  abrirLogin(): void {
    const modalRef = this.modalService.open(LoginComponent, {size: 'sm', keyboard: false});
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }

  public triggerScrollTo(destino: string) {
    const config: ScrollToConfigOptions = {
      target: destino
    };
    this._scrollToService.scrollTo(config);
  }

}
