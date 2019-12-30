import { ParceriasPrograma } from './parcerias-programa';
import { Material } from './material';
import { Programa } from './programa';

export class MateriaisPrograma {

	id:number;
	dataFim:Date;
	dataInicio:Date;
	material:Material;
	programa:Programa;
	vlMaterial:number;
    parceriasPrograma:ParceriasPrograma;
    
}