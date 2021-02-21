import { Funcionario } from 'src/app/core/funcionario';
import { AnexosAcaoPlanejamento } from './anexos-acao-planejamento';
import { Atividade } from './atividade';
import { GrupoAcoes } from './grupo-acoes';
import { GrupoAcoesSimples } from './grupo-acoes-simples';
import { MateriaisAcao } from './materiais-acao';

export class Acoes {
	id: number;
	
	dataFim: Date;
	dataInicio: Date;
	dataPrevisaoFim: Date;
	dataPrevisaoInicio: Date;
	dataAprovaAcao: Date;

	descricao: string;
	descricaoObjetivoAcao: string;
	descricaoMetodologiaAcao: string;
	descricaoAvaliacaoAcao: string;
	descricaoOcorrenciaAcao: string;
	
	oficina: Atividade;
	
	funcionarioPlanejamentoAcao: Funcionario;
	funcionarioAprovaAcao: Funcionario;
	funcionarioExecutaAcao: Funcionario;
	usuarioAlteracao: number;

	materiaisAcao: MateriaisAcao[];
	localExecucao: string;

	grupoAcao: GrupoAcoesSimples;

	// anexos: AnexosAcaoPlanejamento[] = [];	
	// tamanhoMaximoAnexoExcedido?: boolean;
	
}