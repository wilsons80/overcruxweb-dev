import { Turmas } from './turmas';
import { AtividadeAluno } from './atividade-aluno';
import { Aluno } from './aluno';

export class AlunosTurma {

	id: number;
	aluno: Aluno;
	turma: Turmas;

	dataCadastro: Date;
	dataInicio: Date;
	dataDesvinculacao: Date;
	dataAlteracao: Date;

	descricaoDesligamento: string;
	usuarioAlteracao: number;

	oficinas: AtividadeAluno[];
}