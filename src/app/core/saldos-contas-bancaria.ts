import { ContasBancaria } from 'src/app/core/contas-bancaria';

export class SaldosContasBancaria {
    id: number;
	descricaoSaldo: string;
	dataAtualizacaoSaldo: Date;
	dataSaldo: Date;
	valorSaldo: number;
	contaBancaria: ContasBancaria;
}