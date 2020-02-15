import { Departamento } from './departamento';
import { Projeto } from './projeto';
import { Programa } from './programa';
import { Empresa } from './empresa'
import { Unidade } from './unidade';

export class Movimentacoes{
    id:number;
	empresa:Empresa;
	stTipoMovimentacao:string;
	dataMovimentacao:Date;
	descricaoMovimentacao:string;
	nrDocumento:string;
	dataDocumento:Date;
	valorMovimentacao:number;
	programa:Programa;
	projeto:Projeto;
	unidade:Unidade;
	departamento:Departamento;
	qtdParcelas:number;
}