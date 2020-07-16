import { Atividade } from './atividade';
import { PessoaFisica } from './pessoa-fisica';

export class CadastroReservaAtividade {
    id: number;
	dataCadastroReserva: Date;
	descricaoCadastroReserva: string;
	dataCancelamentoCadastro: Date;
	descricaoCancelamentoCadastro: string;
	atividade: Atividade;
	nomeInteressado: string;
	dadosTelefone: string;
	usuarioAlteracao: number;
}