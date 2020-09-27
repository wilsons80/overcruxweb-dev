export class Conciliacao {
	id :number;
	seq :number;
	tipo: string;
	situacao: string;
	numeroDocumento: string;
	data: Date;
	banco: string;
	categoria: string;
	fornecedor: string;
	complemento: string;
	centroCusto: string;
	grupoContas: string;
	valor: number;
	semDocumento: boolean;
}