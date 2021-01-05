import { Cbo } from './cbo';
import { Instituicao } from './instituicao';

export class Cargo {
	id: number;
	codigo: string;
	nome: string;
	tipoCargo: string;
	usuarioAlteracao: number;
	cbo: Cbo;
  	descricaoPerfilProfissional: string;
  	descricaoResumoAtividades: string;
	qtdHoras: number;
	valorRemuneracao:number;
	instituicao: Instituicao;
}
