import { Movimentacoes } from './movimentacoes';
import { CategoriasContabeis } from './categorias-contabeis';
import { Departamento } from './departamento';
import { Material } from './material';
import { Unidade } from './unidade';
export class ItensMovimentacoes{

    id:number;
	descricaoItemMovimentacao:string;
	categoria:CategoriasContabeis;
	departamento:Departamento;
	material:Material;
	movimentacao:Movimentacoes;
	unidade:Unidade;
	quantidadeMaterial:number;
	valorTotalItem:number;
	valorUnitarioItem:number;
	pedidosMateriais:any;

	valorISS:number;
	valorICMS:number;
	valorIPI:number;
	valorPisConfinsCsll:number;
	valorInss:number;
}