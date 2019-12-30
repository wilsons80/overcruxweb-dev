import { Funcionario } from './funcionario';
import { Aluno } from './aluno';
import { TipoOcorrenciaAluno } from './tipo-ocorrencia-aluno';

export class OcorrenciaAluno {
	id: number;
	aluno: Aluno;
	funcionario: Funcionario;
	tipoOcorrenciaAluno: TipoOcorrenciaAluno;
	dataOcorrencia: Date;
	dataCiencia: Date;
	descricao: string;
	local: string;
	usuarioAlteracao: number;
}

