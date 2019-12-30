import { TiposContratacoes } from "./tipos-contratacoes";
import { Cargo } from './cargo';

export class ComposicaoRhPrograma {

	id:number;
	cargo:Cargo;
	qtd:number;
    tiposContratacoes:TiposContratacoes;
    
}