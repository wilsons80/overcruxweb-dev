import { ColaboradoresPrograma } from './colaboradores-programa';
import { Objetivo } from './objetivo';
import { Unidade } from './unidade';
import { ParceriasPrograma } from './parcerias-programa';
import { ComposicaoRhPrograma } from './composicao-rh-programa';
import { MateriaisPrograma } from './materiais-programa';
import { ContasCentrosCusto } from './contas-centros-custo';

export class Programa {
	id: number;
	nome: string;
	descricao: string;
	dataInicio: Date;
	dataFim: Date;
	idCoordenador: number;
	faixaEtariaFim: number;
	faixaEtariaInicio: number;
	objetivo: Objetivo;
	usuarioAlteracao: number;
	publicoAlvo:string;
	justificativa:string;
	objetivoGeral:string;
	unidades:Unidade[];
	colaboradoresPrograma:ColaboradoresPrograma[];
	parceriasPrograma:ParceriasPrograma[];
	composicaoRhPrograma:ComposicaoRhPrograma[];
	materiaisPrograma:MateriaisPrograma[];
	contasCentrosCusto:ContasCentrosCusto[];
}