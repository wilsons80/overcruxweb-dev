import { Cargo } from './cargo';
import { Funcionario } from './funcionario';
import { Programa } from './programa';
import {TiposContratacoes} from 'src/app/core/tipos-contratacoes';

export class ColaboradoresPrograma {
	id: number;
	dataInicio: Date;
	dataFim: Date;
	funcionario: Funcionario;
	programa: Programa;
	cargo: Cargo;
	tiposContratacoes: TiposContratacoes;
	usuarioAlteracao: number;
	percentual: number;
}