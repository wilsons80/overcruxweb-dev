import { Aluno } from './aluno';
import { Familiares } from './familiares';

export class ResponsaveisAluno {
	id: number;
	descDesligamento: string;
	descGrauParentesco: string;
	dataDesvinculacao: Date;
	dataVinculacao: Date;
	mesmoEnderResponsavel: string;

	aluno: Aluno;
	familiar: Familiares;

	transportaAluno: boolean;
    tutelaAluno: boolean;
	responsavelFinanceiroPeloAluno: boolean;
	
    usuarioAlteracao: number;
} 