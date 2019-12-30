import { Perspectiva } from './perspectiva';

export class Objetivo {
	idObjetivo: number;
	nome:string;
	perspectiva:Perspectiva;
	usuarioAlteracao:string;
	dataImplantacao:Date;
	dataTermino:Date;
}
