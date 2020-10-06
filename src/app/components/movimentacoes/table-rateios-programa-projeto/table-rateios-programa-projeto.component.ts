import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RateiosProgramaProjeto } from 'src/app/core/rateios-programa-projeto';
import { RateiosProgramaProjetoService } from 'src/app/services/rateios-programa-projeto/rateios-programa-projeto.service';

@Component({
  selector: 'table-rateios-programa-projeto',
  templateUrl: './table-rateios-programa-projeto.component.html',
  styleUrls: ['./table-rateios-programa-projeto.component.css']
})
export class TableRateiosProgramaProjetoComponent implements OnInit {

  @Input() idMovimentacao;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  colunasVisiveis: Array<string> = ['programaprojeto', 'valor'];
  dataSource: MatTableDataSource<RateiosProgramaProjeto>;
  loadingCompleto = false;

  constructor(private rateiosProgramaProjetoService: RateiosProgramaProjetoService,) { 
  }

  ngOnInit(): void {
    this.getAllRateios();
  }

  private getAllRateios() {
    this.rateiosProgramaProjetoService.getAllPorMovimento(this.idMovimentacao)
    .subscribe((rateios: RateiosProgramaProjeto[]) => {
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = rateios;
      this.dataSource.sort = this.sort;

      this.dataSource.connect();
    }).add(() => this.loadingCompleto = true);

  }
}
