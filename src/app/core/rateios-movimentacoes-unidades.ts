import { Unidade } from './unidade';

export class RateiosMovimentacoesUnidades{
	id: number;
	idMovimentacao: number;
	unidade: Unidade;
	statusPercentual: boolean;
	valorRateio: number;
	usuarioAlteracao: number;
}