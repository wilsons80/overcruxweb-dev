import { MateriaisProjeto } from './materiais-projeto';
import { Iniciativa } from './iniciativa';
import { Programa } from './programa';
import { Unidade } from './unidade';
import { ColaboradoresProjeto } from './colaboradores-projeto';
import { ParceriasProjeto } from './parcerias-projeto';
import { ComposicaoRhProjeto } from './composicao-rh-projeto';
import { ContasCentrosCusto } from './contas-centros-custo';

export class Projeto {

	id: number;
	nome: string;
	descricao: string;
	dataFim: Date;
	dataInicio: Date;
	dataPrevisaoInicio: Date;
	dataPrevisaoTermino: Date;
	iniciativa: Iniciativa;
	programa: Programa;
	usuarioAlteracao: number;
	publicoAlvo:string;
	justificativa:string;
	objetivoGeral:string;
	unidades: Unidade[];
	colaboradoresProjeto:ColaboradoresProjeto[];
	parceriasProjeto:ParceriasProjeto[];
	composicaoRhProjeto:ComposicaoRhProjeto[];
	materiaisProjeto:MateriaisProjeto[]
	contasCentrosCusto:ContasCentrosCusto[];

}

