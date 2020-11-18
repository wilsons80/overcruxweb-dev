import { TipoEmpresa } from 'src/app/core/tipo-empresa';
import { Empresa } from './empresa';
import { Projeto } from './projeto';
import { MateriaisProjeto } from './materiais-projeto';
import { ParceriasCategorias } from './parcerias-categorias';
import { ParceriasProjeto } from './parcerias-projeto';
export class AditivoParceriaProjeto {

    id:number;
	parceriasProjeto:ParceriasProjeto;
	dataAditivo:Date;
	valorAditivo:number;

}