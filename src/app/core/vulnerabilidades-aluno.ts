import { SituacoesVulnerabilidade } from './situacoes-vulnerabilidade';
import { Solucoes } from './solucoes';
import { Aluno } from './aluno';

export class VulnerabilidadesAluno {
	id: number;
	dataIdentificacao: Date;
	dataSolucao: Date;
  idAluno: number;

	situacoesVulnerabilidade: SituacoesVulnerabilidade;
  solucoes: Solucoes;

  usuarioAlteracao: number;
}
