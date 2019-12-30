import { PessoaFisica } from './pessoa-fisica';

export class CursoFormacao{
    id:number;
	dataFim:Date;
	dataInicio:Date;
	nome:string;
	nomeInstuicao:string;
	pessoaFisica:PessoaFisica;
	usuarioAlteracao:number;
}
