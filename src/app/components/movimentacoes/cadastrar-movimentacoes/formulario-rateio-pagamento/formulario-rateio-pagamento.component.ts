import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Acesso } from 'src/app/core/acesso';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { ContasCentrosCusto } from 'src/app/core/contas-centros-custo';
import { PagamentosFatura } from 'src/app/core/pagamentos-fatura';
import { Programa } from 'src/app/core/programa';
import { Projeto } from 'src/app/core/projeto';
import { RateiosPagamentos } from 'src/app/core/rateios-pagamentos';
import { ToastService } from 'src/app/services/toast/toast.service';
import * as _ from 'lodash';

@Component({
  selector: 'formulario-rateio-pagamento',
  templateUrl: './formulario-rateio-pagamento.component.html',
  styleUrls: ['./formulario-rateio-pagamento.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormularioRateioPagamentoComponent implements OnInit {

  @Input() index: number;
  @Input() rateio: RateiosPagamentos;
  @Input() perfilAcesso: Acesso;
  @Input() pagamentosFatura: PagamentosFatura;
  @Input() programas: Programa[];
  @Input() projetos: Projeto[];
  @Input() contasBancarias: ContasCentrosCusto[];
  @Output() onContaRateioValida = new EventEmitter()

  
  pinContaBancaria  = Date.now();
  pinCheck          = Date.now();
  pinValor          = Date.now();
  pinDescricao      = Date.now();

  constructor(private toastService: ToastService) { 
  }

  ngOnInit(): void {
  }

  deletar() {
    this.pagamentosFatura.rateioPagamento.splice(this.index, 1);
  }



  validarContaBancaria() {
    if(this.pagamentosFatura.contaBancaria && this.pagamentosFatura.contaBancaria.id 
       && 
       this.rateio.contaBancaria && this.rateio.contaBancaria.id) {
      if(this.pagamentosFatura.contaBancaria.id === this.rateio.contaBancaria.id) {
        this.toastService.showAlerta('A conta de rateio deve ser diferente da conta bancária do pagamento.');
        this.onContaRateioValida.emit(false);
        return;
      }
    }


    const contaConflitante = this.pagamentosFatura.rateioPagamento
                                                  .filter(r => r.contaBancaria.id === this.rateio.contaBancaria.id);
    if(contaConflitante && contaConflitante.length > 1) {
      this.toastService.showAlerta('Essa conta de rateio já está cadastrada para esse pagamento.');
      this.onContaRateioValida.emit(false);
      return;
    }


    this.onContaRateioValida.emit(true);
  }


  getNomeProjetoPrograma(conta: any) {
    let nomeProjetoPrograma = '';
    let retorno = `${conta.contasBancaria.banco.numero} - ${conta.contasBancaria.banco.nome} | Ag. ${conta.contasBancaria.numeroAgencia} | C. ${conta.contasBancaria.numeroContaBancaria}`;
    

    if(conta.idProjeto && this.projetos) {
      const projeto = this.projetos.find((p: any) => p.id === conta.idProjeto);
      if (!!projeto) {
        nomeProjetoPrograma = projeto.nome;
      }
    } else {
      const programa = this.programas.find((p: any) => p.id === conta.idPrograma);
      if (!!programa) {
        nomeProjetoPrograma = programa.nome;
      }
    }

    retorno += ' | ' + nomeProjetoPrograma;
    return retorno;
  }

}
