import { Aluno } from './aluno';

export class ReprovacaoAluno {
	id: number;
	descricaoMotivo: string;
	serieReprovacao: string;
	dataReprovacao: Date;
	qtdReprovacao: number;
	aluno: Aluno;
	usuarioAlteracao: number;
}