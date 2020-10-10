import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Movimentacoes } from 'src/app/core/movimentacoes';
import { DataSimplesPipe } from 'src/app/pipes/data-simples.pipe';

@Component({
  selector: 'proximas-fatura-cell',
  templateUrl: './proximas-fatura-cell.component.html',
  styleUrls: ['./proximas-fatura-cell.component.css'],
  providers: [DataSimplesPipe],
  encapsulation: ViewEncapsulation.None,
})
export class ProximasFaturaCellComponent implements OnInit {

  @Input() movimento: Movimentacoes;

  dados : any[];
  dadosTooltip = '';

  constructor(private dataSimplesPipe: DataSimplesPipe) { }

  ngOnInit() {
    if(!this.dados) {
      this.dados = [];
    }

    if (!this.movimento.faturas && this.movimento.faturas.length === 0) {
      this.dados[0] =  '' ;
    }


    const proximasFaturas = this.movimento.faturas.filter(f => {
      const pagamento = this.movimento.pagamentosFatura.find(p => p.idFatura === f.id);
      return !pagamento;
    });

    proximasFaturas.sort((a,b) => {
      if (a.dataVencimento > b.dataVencimento) {return 1;}
      if (a.dataVencimento < b.dataVencimento) {return -1;}
      return 0;
    });

    this.dados = proximasFaturas 
                      ? proximasFaturas.map(f => (f.dataVencimento ? this.dataSimplesPipe.transform(f.dataVencimento) : '') + ', ') 
                      : null;

    this.dadosTooltip = this.dados ? this.dados.slice(1).join('\n') : '' ;
    this.dadosTooltip = this.dadosTooltip.substring(0, this.dadosTooltip.length-2);
  }

  getPrimeiroRegistro(){
    return this.dados[0].substring(0, this.dados[0].length-2);
  }


}
