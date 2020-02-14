import { FuncoesInstituicao } from './funcoes-instituicao';
export class Instituicao {

	id: number;
	nome: string;
	arquivo: number;
	usuarioAlteracao: number;
	mostraLista: boolean;
	areaAtuacao:string;
	apresentacao:string;
	visao:string;
	missao:string;
	valores:string;
	finalidadesEstatutarias:string;
	foto?: any;
	urlFoto?: any;
	isFotoChanged?: boolean;
	funcoesInstituicao:FuncoesInstituicao[];
}
