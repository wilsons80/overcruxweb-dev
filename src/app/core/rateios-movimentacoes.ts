import { Programa } from './programa';
import { Projeto } from './projeto';

export class RateiosMovimentacoes{
	id: number;
	idMovimentacao: number;
	programa: Programa;
	projeto: Projeto;
	statusPercentual: boolean;
	valorRateio: number;
	usuarioAlteracao: number;
}