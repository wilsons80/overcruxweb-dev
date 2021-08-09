import { TipoEmpresa } from './tipo-empresa';
import { CategoriaEmpresa } from './categoria-empresa';

export class Empresa {

	id:number;
	codigo:string;
	nomeRazaoSocial:string;
	nomeFantasia:string;
	cnpj:string;
	inscricaoEstadual:string;
	inscricaoMunicipal:string;
	ativa:string;
	tipoEmpresa:TipoEmpresa;
	valorIcms:number;
	descricaoTipoEmpresa:string;
	categoriaEmpresa:CategoriaEmpresa;
	descricaoCategoriaEmpresa:string;
	telefone:string;
	email:string;
	autorizaEmail:string;
	homePage:string;
	endereco:string;
	bairro:string;
	cidade:string;
	cep:number;
	uf:string;
    usuarioAlteracao:number;
	categoria: any;
}

