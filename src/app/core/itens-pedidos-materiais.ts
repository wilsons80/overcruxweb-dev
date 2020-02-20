import { PedidosMateriais } from 'src/app/core/pedidos-materiais';
import { Material } from 'src/app/core/material';


export class ItensPedidosMateriais {
    id: number;
    material: Material;
    usuarioAlteracao: number;
    qtdPedido: number;
    pedidosMateriais: PedidosMateriais;
}