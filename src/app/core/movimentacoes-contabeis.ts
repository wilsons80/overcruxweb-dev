import { AnyAaaaRecord } from 'dns';
import { CategoriasContabeis } from './categorias-contabeis';
import { Programa } from './programa';
import { Projeto } from './projeto';

export class MovimentacoesContabeis {
	id: number;
	dataMovimentacao: Date;
	valorMovimentacao: number;
	descricao: string;
	programa01: Programa;
	projeto01: Projeto;
	categoriaOrigem01: any;
	categoriaDestino01: any;
	programa02: Programa;
	projeto02: Projeto;
	categoriaOrigem02: any;
	categoriaDestino02: any;

}

