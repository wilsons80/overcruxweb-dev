import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Movimentacoes } from 'src/app/core/movimentacoes';

@Component({
  selector: 'categorias-cell',
  templateUrl: './categorias-cell.component.html',
  styleUrls: ['./categorias-cell.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriasCellComponent implements OnInit {

  @Input() movimento: Movimentacoes;

  dados : any[];
  dadosTooltip = '';

  constructor() { }

  ngOnInit() {
    if(!this.dados) {
      this.dados = [];
    }

    if (!this.movimento.itensMovimentacoes && this.movimento.itensMovimentacoes.length === 0) {
      this.dados[0] =  '' ;
    }

    this.dados = this.movimento.itensMovimentacoes 
                      ? this.movimento.itensMovimentacoes.map(item => (item.categoria.descricaoCategoria || '') + ', ') 
                      : null;

    this.dadosTooltip = this.dados ? this.dados.slice(1).join('\n') : '' ;
    this.dadosTooltip = this.dadosTooltip.substring(0, this.dadosTooltip.length-2);
  }

  getPrimeiroRegistro(){
    return this.dados[0].substring(0, this.dados[0].length-2);
  }
  
}
