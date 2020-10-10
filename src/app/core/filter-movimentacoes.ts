import { Projeto } from './projeto';
import { Programa } from './programa';
import { Empresa } from './empresa'

export class FilterMovimentacoes{

	empresa: Empresa;
	programa: Programa;
	projeto: Projeto;
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