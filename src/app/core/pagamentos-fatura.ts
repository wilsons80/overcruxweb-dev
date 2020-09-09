import { SaldosContasBancaria } from './saldos-contas-bancaria';
import { ContasBancaria } from './contas-bancaria';

export class PagamentosFatura{

    id: number;
	idFatura: number;
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

	descricao: string;
}