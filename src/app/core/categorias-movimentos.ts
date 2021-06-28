import { CategoriasContabeis } from './categorias-contabeis';
import { PlanosContas } from './planos-contas';
import { RateiosCategoriasMovimentos } from './rateios-categorias-movimentos';

export class CategoriasMovimentos{

	id: number;
	idMovimento: number;
	categoriaOrigem: any; //CategoriasContabeis
	categoriaDestino: any; //CategoriasContabeis
	valor: number;
	descricao: string;
	
	rateioCategoriasMovimentos: RateiosCategoriasMovimentos[];

}
