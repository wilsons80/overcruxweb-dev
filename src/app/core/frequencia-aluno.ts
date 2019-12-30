import { AtividadeAluno } from './atividade-aluno';

export class FrequenciaAluno {
	id: number;
	justificativa: string;
	dataFrequencia: Date;
	frequencia: Boolean;
	atividadesAluno: AtividadeAluno;
	usuarioAlteracao: number;

	disabilitado: Boolean;
}