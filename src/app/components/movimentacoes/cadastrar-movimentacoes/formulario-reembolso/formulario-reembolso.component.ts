import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Acesso } from 'src/app/core/acesso';
import { PagamentosFatura } from 'src/app/core/pagamentos-fatura';
import { RateiosMovimentacoes } from 'src/app/core/rateios-movimentacoes';
import { ReembolsosPagamentos } from 'src/app/core/reembolsos-pagamentos';
import { ContasBancariaService } from 'src/app/services/contas-bancaria/contas-bancaria.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'formulario-reembolso',
  templateUrl: './formulario-reembolso.component.html',
  styleUrls: ['./formulario-reembolso.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormularioReembolsoComponent implements OnInit {

  @Input() index: number;
  @Input() reembolso: ReembolsosPagamentos;
  @Input() perfilAcesso: Acesso;
  @Input() pagamentosFatura: PagamentosFatura;
  @Input() rateios: RateiosMovimentacoes[];
  @Input() contasBancarias: ContasBancariaService[];

  @Output() onContaReembolsoValida = new EventEmitter()
    
  pinContaBancaria  = Date.now();
  pinCheckReembolso = Date.now();
  pinDataReembolso  = Date.now();
  pinValorReembolso = Date.now();

  constructor(private toastService: ToastService) { 

  }

  ngOnInit(): void {
  }

  deletar() {
    this.pagamentosFatura.reembolsos.splice(this.index, 1);
  }

  validarContaReembolso() {
    if(this.pagamentosFatura.contaBancaria && this.pagamentosFatura.contaBancaria.id 
       && 
       this.reembolso.contaBancaria && this.reembolso.contaBancaria.id) {
      if(this.pagamentosFatura.contaBancaria.id === this.reembolso.contaBancaria.id) {
        this.toastService.showAlerta('A conta de reembolso deve ser diferente da conta bancária do pagamento.');
        this.onContaReembolsoValida.emit(false);
      }else {
        this.onContaReembolsoValida.emit(true);
      }
    }
  }
}
