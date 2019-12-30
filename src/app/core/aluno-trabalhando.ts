import {Aluno} from './aluno';

export class AlunoTrabalhando {
	id: number;
	descTipoEmpreendimento: string;
	dataFimAlunoTrabalhando: Date;
	dataInicioAlunoTrabalhando: Date;
	nomeEmpreendimento: string;
	aluno: Aluno;
	usuarioAlteracao: number;
}