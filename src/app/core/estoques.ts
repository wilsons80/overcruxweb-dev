import { Projeto } from './projeto';
import { Programa } from './programa';
import { Departamento } from './departamento';
import { Funcionario } from './funcionario';
import { Unidade } from './unidade';
import { Material } from './material';


export class Estoques {
	id: number;
	material: Material;
	unidade: Unidade;
	funcionario: Funcionario;
	departamento: Departamento;
	programa: Programa;
	projeto: Projeto;

	dataEstoque: Date;
	dtAtzEstoque: Date;

	quantidadeEstoque: number;
	valorMedioMaterial: number;
	valorUltimoMaterial: number;
	quantidadeMinimoEstoque: number;
	quantidadeMaximoEstoque: number;
	valorEntradaMaterial: number;
	
	descricaoMovimentacaoEstoque: string;
	descricaoFormaValorEntrada: string;

	// Classificador do tipo de entrada do material no estoque (C = COMPRA; D = DOAÇÃO; P = PAGAMENTO DE PENA; O = OUTRO)
	tipoEntradaMaterial: string;

	// Classificador do tipo de movimentação do estoque (E = ENTRADA; S = SAÍDA; A = ACERTO; O = OUTRO)
	tipoMovimentacaoEstoque: string;
	
	usuarioAlteracao: number;

}