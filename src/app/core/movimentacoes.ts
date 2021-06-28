import { ItensMovimentacoes } from './itens-movimentacoes';
import { Departamento } from './departamento';
import { Projeto } from './projeto';
import { Programa } from './programa';
import { Empresa } from './empresa'
import { Unidade } from './unidade';
import { Fatura } from './fatura';
import { PagamentosFatura } from './pagamentos-fatura';
import { ContasBancaria } from './contas-bancaria';
import { RateiosMovimentacoes } from './rateios-movimentacoes';
import { RateiosMovimentacoesUnidades } from './rateios-movimentacoes-unidades';
import { Doadores } from './doadores';
import { TributoMovimentacao } from './tributo-movimentacao';
import { PessoaFisica } from './pessoa-fisica';
import { CategoriasMovimentos } from './categorias-movimentos';

export class Movimentacoes{
    id:number;
	empresa:Empresa;
	stTipoMovimentacao:string;
	dataMovimentacao:Date;
	descricaoMovimentacao:string;
	nrDocumento:string;
	dataDocumento:Date;
	valorMovimentacao:number;
	unidade:Unidade;
	departamento:Departamento;
	qtdParcelas:number;
	itensMovimentacoes:ItensMovimentacoes[]
	faturas:Fatura[]
	pagamentosFatura:PagamentosFatura[];
	rateios: RateiosMovimentacoes[];
	rateiosUnidades: RateiosMovimentacoesUnidades[];
	categoriasMovimentos: CategoriasMovimentos[];

	contaBancaria: ContasBancaria;
	contaBancariaDestino: ContasBancaria;

	doador: Doadores;
	tributos: TributoMovimentacao[];

	fornecedorColaborador: any; //não está tipado pq o combo-pesquisável usa lista com objeto diferente
}