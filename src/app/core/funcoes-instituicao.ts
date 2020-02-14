import { Funcionario } from './funcionario';
import { Instituicao } from './instituicao';
import { Funcoes } from './funcoes';

export class FuncoesInstituicao {

    id: number;
    funcoes: Funcoes;
    instituicao: Instituicao;
    funcionario: Funcionario;
    dataInicio: Date;
    dataFim: Date;

}