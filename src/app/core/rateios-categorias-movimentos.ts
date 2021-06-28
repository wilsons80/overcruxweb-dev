import { Programa } from './programa';
import { Projeto } from './projeto';

export class RateiosCategoriasMovimentos {

	id: number;
	idCategoriaMovimento: number;
	programa: Programa;
	projeto: Projeto;
	valorRateio: number;
	usuarioAlteracao: number;
	placeHolderRateio?: string;
}