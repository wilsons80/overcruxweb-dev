import { CategoriasContabeis } from './categorias-contabeis';

export class Tributos {
	id: number;
	codigo: string;
	descricao: string;
	usuarioAlteracao: number;
	idInstituicao: number;
	categoria: CategoriasContabeis;
	diaVencimento: number;
	recebedor: string;

}
