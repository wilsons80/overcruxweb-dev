import { Funcionario } from './funcionario';
import { Departamento } from './departamento';
import { Programa } from './programa';
import { Projeto } from './projeto';
import { Unidade } from './unidade';

export class PedidosMateriais{
    id:number;
	descricaoPedido:string;
	dataFimPeriodo:Date;
	dataInicioPeriodo:Date;
	dataPedido:Date;
	departamento:Departamento;
	funcionarioPedido:Funcionario;
	funcionarioRecPed:Funcionario;
	programa:Programa;
	projeto:Projeto;
	unidade:Unidade;
	
}