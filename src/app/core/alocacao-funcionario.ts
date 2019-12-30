import { Projeto } from './projeto';
import { Programa } from './programa';
import { Funcionario } from './funcionario';

export class AlocacaoFuncionario {

	id: number;
	dataFimVinculacao: Date;
	dataInicioVinculacao: Date;
	funcionario: Funcionario;
	programa: Programa;
	projeto: Projeto;
	valorAlocacao: number;
	usuarioAlteracao: number;

}
