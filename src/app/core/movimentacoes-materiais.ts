import { Funcionario } from './funcionario';
import { Material } from './material';
import { Unidade } from './unidade';
import { Programa } from './programa';
import { Projeto } from './projeto';
import { Empresa } from './empresa';

export class MovimentacoesMateriais{
    id:number;
    material:Material;
    unidade:Unidade;
    programa:Programa;
    projeto:Projeto;
    empresa:Empresa;
    qtdMaterial:number;
    tipoMovimentacao:any;
    dataEnvioMaterial:Date;
    funcionarioEnvio:Funcionario;
    dataRececimentoMaterial:Date;
    funcionarioRecebe:Funcionario;
    descricaoMovimentacaoMaterial;
    numeroTombamento:string;
}