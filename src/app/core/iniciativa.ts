import { Metas } from './metas';

export class Iniciativa{
    id:number;
	nome:string;
	metas:Metas;
	usuarioAlteracao:number;
	dataFim:Date;
	dataInicio:Date;
}