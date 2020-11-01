import { Projeto } from './projeto';
import { Programa } from './programa';
import { Empresa } from './empresa'
import { ComboPrograma } from './combo-programa';
import { ComboProjeto } from './combo-projeto';

export class FilterMovimentacoes{

	empresa: Empresa;
	programa: ComboPrograma;
	projeto: ComboProjeto;
	valor: number;
	dataInicioDoc: Date;
	dataFimDoc: Date;
	dataVencimento: Date;
	dataInicioMov: Date;
	dataFimMov: Date;
	dataInicioPag: Date;
	dataFimPag: Date;
	numeroDocumento: string


}