import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { Questionario } from './questionario';
import { Funcionario } from './funcionario';

export class Talento {

    id: number;
    respostaTalento: string;
    dataRespostaTalento: Date;
    nrNotaCompetencia: number;
    observacao: string;
    questionario: Questionario;
    usuariosAlteracao: number;
    funcionario:Funcionario;
}