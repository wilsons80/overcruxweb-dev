import { Unidade } from './unidade';

export class RateiosMovimentacoesUnidades{
	id: number;
	idMovimentacao: number;
	idUnidade: number;
	statusPercentual: boolean;
	valorRateio: number;
	usuarioAlteracao: number;
	placeHolderRateio?: string;
}