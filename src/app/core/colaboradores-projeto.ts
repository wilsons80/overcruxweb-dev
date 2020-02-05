import { TiposContratacoes } from 'src/app/core/tipos-contratacoes';
import { Cargo } from './cargo';
import { Funcionario } from './funcionario';
import { Projeto } from './projeto';



export class ColaboradoresProjeto  {
	id: number;
	dataInicio: Date;
	dataFim: Date;
	funcionario: Funcionario;
	projeto: Projeto;
	cargo: Cargo;
	tiposContratacoes:TiposContratacoes
	usuarioAlteracao: number;
	percentual: number;
}