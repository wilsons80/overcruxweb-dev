import { Programa } from './programa';
import { ColaboradoresAtividade } from './colaboradores-atividade';
import { Projeto } from './projeto';
import { Unidade } from './unidade';
import { MateriaisAtividade } from './materiais-atividade';
import { TiposAtividades } from './tipos-atividades';
import { Funcionario } from './funcionario';
import { Atividade } from './atividade';
import { Acoes } from './acoes';

export class GrupoAcoes {
	id: number;
	numeroGrupo: string;	
	atividade: Atividade;
	funcionarioAnalise: Funcionario;		
	dataAnalise: Date;
	
	// (A = APROVADA; R = REPROVADA
	statusAnalise: string;

	statusEnvioAnalise: Boolean;
	descricao: string;
	acoes: Acoes[] = [];
}