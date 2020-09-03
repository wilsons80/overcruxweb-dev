import { FormaPagamento } from './forma-pagamento';
import { SaldosContasBancaria } from './saldos-contas-bancaria';
import { Fatura } from './fatura';
import { ContasBancaria } from './contas-bancaria';

export class PagamentosFatura{

    id: number;
	fatura: Fatura;
	contaBancaria: ContasBancaria;
	saldoContaBancaria: SaldosContasBancaria;
	valorPagamento: number;
	dataPagamento: Date;
	numeroDocPagamento: number;
    
    // Classificador da forma de pagamento (C = CHEQUE; C = CARTÃO DE CRÉDITO; B =
	// DÉBITO EM CARTÃO; D = EM DINHEIRO
	formaPagamento: string;

	valorMulta: number;
	valorJuros: number;

	contaReembolso: ContasBancaria;
	dataReembolso: Date;
}