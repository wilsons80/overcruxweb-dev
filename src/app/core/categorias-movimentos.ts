import { CategoriasContabeis } from './categorias-contabeis';
import { PlanosContas } from './planos-contas';
import { Programa } from './programa';
import { Projeto } from './projeto';
import { RateiosCategoriasMovimentos } from './rateios-categorias-movimentos';

export class CategoriasMovimentos{

	id: number;
	idMovimento: number;
	categoriaOrigem: any; //CategoriasContabeis
	categoriaDestino: any; //CategoriasContabeis
	valor: number;
	descricao: string;
	dataMovimentacao: Date;
	programa: Programa;
	projeto: Projeto;

	rateioCategoriasMovimentos: RateiosCategoriasMovimentos[];

}
