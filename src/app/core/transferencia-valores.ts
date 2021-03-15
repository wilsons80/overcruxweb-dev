import { Banco } from './banco';
import { SaldosContasBancaria } from './saldos-contas-bancaria';
import { Unidade } from './unidade';


export class TransferenciaValores {
	idMovimentacao:number;
	descContaOrigem: string;
	descContaDestino: string;
	valor: number;
	data: Date;
}

