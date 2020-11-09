import { Programa } from 'src/app/core/programa';
import { AditivoParceriaPrograma } from './aditivo-parceria-programa';
import { Empresa } from './empresa';
import { MateriaisPrograma } from './materiais-programa';
import { ParceriasCategorias } from './parcerias-categorias';
export class ParceriasPrograma {

	id: number;
	dsTipoParceria: string;
	dtFimParceria: Date;
	dtInicioParceria: Date;
	empresa: Empresa;
	programa: Programa;
	valorParceria: number;
	materiaisPrograma: MateriaisPrograma[];
	parceriasCategorias:ParceriasCategorias[];
	aditivosParceriasProgramas:AditivoParceriaPrograma[];

}