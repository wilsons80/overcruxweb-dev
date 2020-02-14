import { Projeto } from './projeto';
import { Programa } from './programa';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
export class ContasCentrosCusto{
    id:number;
	contasBancaria:ContasBancaria;
	programa:Programa;
	projeto:Projeto;
}