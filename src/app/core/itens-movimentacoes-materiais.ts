import { ItensPedidosMateriais } from './itens-pedidos-materiais';
import { ItensMovimentacoes } from 'src/app/core/itens-movimentacoes';
import { Funcionario } from 'src/app/core/funcionario';
import { Estoques } from 'src/app/core/estoques';
import { Material } from './material';
export class ItensMovimentacoesMateriais{
    id:number;
	dataEnvioMaterial:Date;
	dataRecebimentoMaterial:Date;
	estoque:Estoques;
	funcionarioEnvio:Funcionario;
	funcionarioRecebe:Funcionario;
	material:Material;
	numeroTombamento:string;
	quantidadeMaterial:number;
	itensMovimentacoes:ItensMovimentacoes;
	itensPedidosMateriais:ItensPedidosMateriais;

}