import { Movimentacoes } from './movimentacoes';
import { Tributos } from './tributos';
export class TributoMovimentacao {

	id: number;
	idMovimentacao: number;
	tributo: Tributos;
	valor: number;
	usuarioAlteracao: number;
    
}