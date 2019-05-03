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

  constructor(private _tablaService : DataService) { }

  ngOnInit() {
    this.tableData=this._tablaService.DATA;
  }
  
  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
}
