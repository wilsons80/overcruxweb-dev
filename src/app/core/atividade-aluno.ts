import { Aluno } from './aluno';
import { Atividade } from './atividade';

export class AtividadeAluno {
    id: number;
	descDesligamento: string;
	dataInicioAtividade: Date;
	dataDesvinculacao: Date;
	dataAlteracaoAtividade: Date;
	dataCadastroAtividade: Date;
	
	aluno: Aluno;
    atividade: Atividade;
    
	usuarioAlteracao: number;
}