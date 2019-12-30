import { Aluno } from './aluno';
import {EntidadesSociais} from './entidades-sociais';

export class EncaminhamentoAluno {

    id: number;
	descricao: string;
	dataEncaminhaAluno: Date;
	aluno: Aluno;
	entidadeSocial: EntidadesSociais;
    usuarioAlteracao: number;
}