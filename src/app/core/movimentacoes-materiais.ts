import { ItensMovimentacoesMateriais } from './itens-movimentacoes-materiais';
import { Funcionario } from './funcionario';
import { Material } from './material';
import { Unidade } from './unidade';
import { Programa } from './programa';
import { Projeto } from './projeto';
import { Empresa } from './empresa';
import { Departamento } from './departamento';

export class MovimentacoesMateriais{
    id:number;
	descricaoMovimentacaoMaterial:string;
	departamento:Departamento;
	empresa:Empresa;
	programa:Programa;
	projeto:Projeto;
	unidade:Unidade;
	numeroDocumento:string;
	tipoMovimentacao:string;

	itensMovimentacoesMateriais:ItensMovimentacoesMateriais[]
}
