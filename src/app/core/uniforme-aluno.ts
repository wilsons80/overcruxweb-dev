import { AtividadeAluno } from './atividade-aluno';

export class UniformeAluno {
	id: number;
	dataUniformeEntregue: Date;
	nomeUniforme: string;
	qtdUniformeEntregue: number;
	atividadesAluno: AtividadeAluno;
	usuarioAlteracao: number;

	disabilitado: boolean;
}