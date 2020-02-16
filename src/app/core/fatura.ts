import { Movimentacoes } from './movimentacoes';
export class Fatura{

    id:number;
	movimentacao:Movimentacoes;
	dataVencimento:Date;
	valor:number;
    numeroParcela:number;
    
}