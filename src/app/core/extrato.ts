import { MovimentosExtrato } from './movimentos-extrato';

export class Extrato {

	dataAtual: Date;
	numeroBanco: string;
	nomeBanco: string;
	numeroAgencia: string;
	numeroConta: string;
	periodoExtrato: string;

	saldoAnterior: number;
	saldoAtual: number;

	identificacaoConta: string;

	movimentacoes: MovimentosExtrato[];
}