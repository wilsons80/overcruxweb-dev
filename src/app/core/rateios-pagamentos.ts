import { ContasBancaria } from './contas-bancaria';

export class RateiosPagamentos{

	id: number;
	idPagamentoFatura: number;
	contaBancaria: ContasBancaria;
	statusPercentual: boolean;
	valorRateio: number;
	usuarioAlteracao: number;
	placeHolder?:string;
}