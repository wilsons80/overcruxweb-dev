import { ParceriasProjeto } from './parcerias-projeto';
import { Material } from './material';

export class MateriaisProjeto{
    
    id:number;
	dataFim:Date;
	dataInicio:Date;
	material:Material;
	valorMaterial:number;
	quantidadeMaterial:number;

}