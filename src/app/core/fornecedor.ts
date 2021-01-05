import { Empresa } from './empresa'
import { PessoaFisica } from './pessoa-fisica';
import { TiposDoadores } from './tipos-doadores';

export class Fornecedor {
	id: number;
	pessoasFisica: PessoaFisica;
	empresa: Empresa;
	ativo: boolean;
	dataInicioVinculo: Date;
	dataFimVinculo: Date;
}