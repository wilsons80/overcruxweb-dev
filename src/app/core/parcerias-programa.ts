import { Programa } from 'src/app/core/programa';
import { Empresa } from './empresa';
import { MateriaisPrograma } from './materiais-programa';
export class ParceriasPrograma {

	id: number;
	dsTipoParceria: string;
	dtFimParceria: Date;
	dtInicioParceria: Date;
	empresa: Empresa;
	programa: Programa;
	valorParceria: number;
	materiaisPrograma: MateriaisPrograma[];

}