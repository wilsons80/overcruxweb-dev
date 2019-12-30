import { Atividade } from './atividade';

export class Acoes{
    
    id:number;
	dataFim:Date;
	dataInicio:Date;
	dataPrevisaoFim:Date;
	dataPrevisaoInicio:Date;
	nome:string;
    atividade:Atividade;
	usuarioAlteracao:number;
}