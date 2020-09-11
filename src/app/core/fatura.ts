import { Movimentacoes } from './movimentacoes';
import { TributoMovimentacao } from './tributo-movimentacao';
export class Fatura{

    id:number;
	movimentacao:Movimentacoes;
	dataVencimento:Date;
	valor:number;
	numeroParcela:number;
	codigoBarra: string;
	tributoMovimentacao: TributoMovimentacao;
	descricao: string;
    
}