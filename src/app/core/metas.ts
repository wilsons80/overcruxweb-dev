import { Indicadores } from './indicadores';

export class Metas{
    id: number;
	nome:string;
	descricao:string;
	indicadores: Indicadores;
	usuarioAlteracao:number;
	dataFim:Date;
	dataInicio:Date;
}