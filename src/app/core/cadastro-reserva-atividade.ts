import { Atividade } from './atividade';
import { PessoaFisica } from './pessoa-fisica';

export class CadastroReservaAtividade {

    id: number;
    descricaoCadastroReserva: string;
    descricaoCancelamentoCadastro: string;
    dataCadastroReserva: Date;
    dataCancelamentoCadastro: Date;
    dataCadastroAtividade: Date;
    dtAlteracaoAtividade: Date;
    atividade: Atividade;
    pessoasFisica: PessoaFisica;
    usuarioAlteracao: number;

}