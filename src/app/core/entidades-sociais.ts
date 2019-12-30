import { Empresa } from './empresa';

export class EntidadesSociais {
    id: number;
	dataFim: Date;
	dataVinculo: Date;
	empresa: Empresa;
	usuarioAlteracao: number;
}