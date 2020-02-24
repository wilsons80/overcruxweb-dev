import { Funcionario } from 'src/app/core/funcionario';
import { Atividade } from './atividade';
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
	
}