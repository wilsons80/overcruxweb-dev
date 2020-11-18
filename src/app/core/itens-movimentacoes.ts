import { Movimentacoes } from './movimentacoes';
import { CategoriasContabeis } from './categorias-contabeis';
import { Departamento } from './departamento';
import { Material } from './material';
import { Unidade } from './unidade';
import { TributoItemMovimentacao } from './tributo-item-movimentacao';
export class ItensMovimentacoes{

    id:number;
	descricaoItemMovimentacao:string;
	categoria:CategoriasContabeis;
	categoriaAdicional:CategoriasContabeis;
	departamento:Departamento;
	material:Material;
	movimentacao:Movimentacoes;
	unidade:Unidade;
	quantidadeMaterial:number;
	valorTotalItem:number;
	valorUnitarioItem:number;
	pedidosMateriais:any;

	tributos: TributoItemMovimentacao[];

}