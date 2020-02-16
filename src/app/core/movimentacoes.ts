import { ItensMovimentacoes } from './itens-movimentacoes';
import { Departamento } from './departamento';
import { Projeto } from './projeto';
import { Programa } from './programa';
import { Empresa } from './empresa'
import { Unidade } from './unidade';
import { Fatura } from './fatura';
import { PagamentosFatura } from './pagamentos-fatura';

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
	itensMovimentacoes:ItensMovimentacoes[]
	faturas:Fatura[]
	pagamentosFatura:PagamentosFatura[]
}