import {Aluno} from './aluno';
import { Empresa } from './empresa';

export class AlunoTrabalhando {
	id: number;
	descTipoEmpreendimento: string;
	dataFimAlunoTrabalhando: Date;
	dataInicioAlunoTrabalhando: Date;
	nomeEmpreendimento: string;
	aluno: Aluno;
	empresa: Empresa;
	usuarioAlteracao: number;
}