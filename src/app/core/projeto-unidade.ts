import { Projeto } from './projeto';
import { Unidade } from './unidade';

export class ProjetoUnidade {

    idProjetoUnidade:number;
    projeto:Projeto;
    unidade:Unidade;
    dataInicio:Date;
    dataFim:Date;
    descricaoProjetoUnidade:string;
    descricaoPublicoAlvo:string;
    descricaoJustificativa:string;
    descricaoObjetivoGeral:string;

}