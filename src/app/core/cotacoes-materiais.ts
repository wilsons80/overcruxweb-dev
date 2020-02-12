import { Material } from './material';
import { Empresa } from './empresa';
import { Pedido } from './pedido';

export class CotacoesMateriais{
    id:number
    material:Material
    pedido:Pedido
    empresa:Empresa
    dataCotacao:Date;
    dataValidadeCotacao:Date
    quantidadeMaterial:number
    valorUnitarioCotacao:number;
    valorTotalCotacao:number;
}