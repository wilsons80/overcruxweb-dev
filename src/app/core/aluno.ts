import { TiposPublicoPrioritario } from './tipos-publico-prioritario';
import { NiveisTurmas } from './niveis-turmas';
import { VulnerabilidadesAluno } from './vulnerabilidades-aluno';
import { Unidade } from './unidade';
import { PessoaFisica } from './pessoa-fisica';
import { EncaminhamentoAluno } from './encaminhamento-aluno';
import { MotivoDesligamento } from './motivo-desligamento';


export class Aluno {
	id: number;
	descProblemaSaude: string;
	descMedicamentosControlados: string;
	descOutrasInformacoes: string;
	descFormaIngressoEntidade: string;
	atendidoOrgaoRede: string;
	observacoes: string;
	
	dataEntrada: Date;
	dataDesligamento: Date;
	dataCadastro: Date;
	dataAlteracaoCadastro: Date;
	descDesligamento: string;

    pessoaFisica: PessoaFisica;
	unidade: Unidade;
	
	moraPais: string;
	paisCasados: string;
	matriculadoEscPub: string;
	descBuscaEscola: string;
	publicoPrioritario: string;
	matriculaAluno: string;
	nivelTurma: NiveisTurmas;

	vulnerabilidades: VulnerabilidadesAluno[];
	encaminhamentos: EncaminhamentoAluno[];

	tiposPublicoPrioritario:TiposPublicoPrioritario;
	motivoDesligamento:MotivoDesligamento;

	dataSugestaoDesligamento:Date;
	descricaoSugestaoDesligamento:String;

	nome?: string;
	nomeMae?: string;
	cpf?: string;
}