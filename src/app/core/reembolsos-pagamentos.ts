import { ContasBancaria } from './contas-bancaria';

export class ReembolsosPagamentos{
	id: number;
	idPagamentoFatura: number;
	contaBancaria: ContasBancaria;
	descricao: string;
	data: Date;
	statusPercentual: boolean;
	valor: number;
	usuarioAlteracao: number;
	contaBancariaDestino:ContasBancaria;
	transacao: string;
}