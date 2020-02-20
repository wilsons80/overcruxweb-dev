import { Material } from './material';
import { Empresa } from './empresa';
import { Pedido } from './pedido';
import { PedidosMateriais } from './pedidos-materiais';

export class CotacoesMateriais{
    id:number
    material:Material
    pedidosMaterial:PedidosMateriais
    empresa:Empresa
    dataCotacao:Date;
    dataValidadeCotacao:Date
    quantidadeMaterial:number
    valorUnitarioCotacao:number;
    valorTotalCotacao:number;
}