import { Banco } from './banco';
import { SaldosContasBancaria } from './saldos-contas-bancaria';
import { Unidade } from './unidade';


export class ContasBancaria {
    id: number;
    banco: Banco;
    tipoContaBancaria: string;
    numeroAgencia: string;
    numeroContaBancaria: number;
    unidade: Unidade;
	nomeTitular: string;
	nomeContato: string;
	cpfCnpjTitular: string;
	telefoneTitular: string;
    emailTitular: string;
    contaAssociada: number;

    descricaoCompleta?:string; // usado em combo pesquisavel

}

