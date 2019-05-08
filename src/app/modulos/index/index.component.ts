import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/dataService';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers:[DataService]
})
export class IndexComponent implements OnInit {
  showloading: boolean = false;
  tableData: Array<any>;
  pageSize = 10;
  pageNumber = 1;
  public AnimationBarOption;
  public activar: boolean = false;
  public isScreamMd: boolean;
  public activarFilter:boolean=true;    

  constructor(private _tablaService : DataService) {
    this.isScreamMd = window.innerWidth <= 576 ? false : true;
   }

  ngOnInit() {
    this.tableData=this._tablaService.DATA;
  }
  
  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
  cambiarActivar() {
    this.activarFilter = !this.activarFilter;
    //this.enviarAccion.emit({ accion: LS.ACCION_ACTIVAR, activar: this.activar });
  }
}
