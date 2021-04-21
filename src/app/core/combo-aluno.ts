export class ComboAluno {
	id: number;
	nome: string;
	matricula?: string;
	dataEntrada?: Date;
	dataDesligamento?: Date;

	descricaoCombo?: string; // usado em combo-pesquisavel
}