import { Solucoes } from './solucoes';
import { SituacoesVulnerabilidade } from './situacoes-vulnerabilidade';
import { Familiares } from './familiares';

export class VulnerabilidadesFamiliar {
    id: number;
	dataIdentificacao: Date;
	dataSolucao: Date;
	
	familiar: Familiares;
	situacoesVulnerabilidade: SituacoesVulnerabilidade;
    solucoes: Solucoes;
    
	usuarioAlteracao: number;
}