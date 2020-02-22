import { ParceriasProjeto } from './parcerias-projeto';
import { ParceriasPrograma } from './parcerias-programa';
import { CategoriasContabeis } from './categorias-contabeis';
export class ParceriasCategorias {

	id:number;
	parceriasPrograma:ParceriasPrograma;
	parceriasProjeto:ParceriasProjeto;
	categoriasContabeis:CategoriasContabeis;
	valorParceriaCategoria:number;

}