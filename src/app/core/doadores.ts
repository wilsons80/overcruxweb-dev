import { ItensMovimentacoes } from './itens-movimentacoes';
import { Departamento } from './departamento';
import { Projeto } from './projeto';
import { Programa } from './programa';
import { Empresa } from './empresa'
import { PessoaFisica } from './pessoa-fisica';
import { TiposDoadores } from './tipos-doadores';

export class Doadores {
	id: number;
	pessoasFisica: PessoaFisica;
	empresa: Empresa;
	tipoDoador: TiposDoadores;
	dataInicioVinculo: Date;
	dataFimVinculo: Date;
	idInstituicao: number;
	usuarioAlteracao: number;
}