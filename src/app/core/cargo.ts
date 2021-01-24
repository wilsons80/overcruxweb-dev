import { Cbo } from './cbo';
import { GrausInstrucao } from './graus-instrucao';
import { Instituicao } from './instituicao';

export class Cargo {
	id: number;
	nome: string;
	tipoCargo: string;
	usuarioAlteracao: number;
	cbo: Cbo;
  	descricaoPerfilProfissional: string;
  	descricaoResumoAtividades: string;
	qtdHoras: number;
	valorRemuneracao:number;
	instituicao: Instituicao;
	grausInstrucao:GrausInstrucao;
}
