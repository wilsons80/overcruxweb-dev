import { Iniciativa } from './iniciativa';

export class PlanosAcao{
    id:number;
	nome:string;
	iniciativa:Iniciativa;
	usuarioAlteracao:number;
	dataFim:Date;
	dataInicio:Date;
}