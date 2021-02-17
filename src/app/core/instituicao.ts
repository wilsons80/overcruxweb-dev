import { ArquivoMetadados } from './arquivo-metadado';
import { FuncoesInstituicao } from './funcoes-instituicao';
export class Instituicao {

	id: number;
	nome: string;
	metadados: ArquivoMetadados;
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
