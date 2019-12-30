import {Aluno} from './aluno';
import {Solucoes} from './solucoes';
import {Diagnostico} from './diagnostico';

export class Atendimento {
	id: number;
	descDiagnostico: string;
	descSolucao: string;
	dataAtendimento: Date;
	solucoes: Solucoes;
	aluno: Aluno;
    diagnostico: Diagnostico;
	usuarioAlteracao: number;
}