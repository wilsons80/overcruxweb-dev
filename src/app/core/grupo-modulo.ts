import { Unidade } from './unidade';
import { Modulo } from './modulo';
import { PerfilAcesso } from './perfil-acesso';

export class GrupoModulo {
	
	id: number;
	nome: string;
	descricao: string;
	modulo: Modulo;
	perfilAcesso: PerfilAcesso;
	unidade: Unidade;
}