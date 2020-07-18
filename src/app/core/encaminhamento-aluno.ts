import {EntidadesSociais} from './entidades-sociais';

export class EncaminhamentoAluno {

    id: number;
	descricao: string;
	dataEncaminhaAluno: Date;
	idAluno: number;
	entidadeSocial: EntidadesSociais;
    usuarioAlteracao: number;
}