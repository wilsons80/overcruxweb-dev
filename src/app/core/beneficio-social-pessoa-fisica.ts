import { BeneficioSocial } from './beneficio-social';
import { PessoaFisica } from './pessoa-fisica';

export class BeneficioSocialPessoaFisica {

	id:number;
	beneficioSocial:BeneficioSocial;
	pessoaFisica:PessoaFisica;
	valor:number;
	dataInicio:Date;
	dataFim:Date;
	
}