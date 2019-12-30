import { Unidade } from './unidade';
import { PessoaFisica } from './pessoa-fisica';
import { UsuariosUnidades } from './usuarios-unidades';

export class UsuarioSistema {
  id: number;
	nomeUsuario: string;
	senhaUsuario: string;
	descFimVigenciaUsuario: string;
	dataFimVigencia: Date;
	dataInicioVigencia: Date;
	dataUltimoAcesso: Date;
	qtdAcessoNegado: number;
	stAtivo: string;
	stTrocaSenha: string;
	pessoaFisica: PessoaFisica;
	usuarioAlteracao: number;
	unidades: UsuariosUnidades[];
}
