import { Talento } from './talento';

export class RateiosProgramaProjeto {
	idRateioMovimentacao: number;
	idMovimentacao: number;
	nomeProgramaProjeto: string;
	fornecedor: string;
	numeroDocumento: string;
	cnpf_cpf: string;
	dataDocumento: Date;
	dataUltimoPagamento: Date;
	dataVencimento: Date;
	valor: number;
	numeroTransacao: string;
	categorias: string;
}