import { Funcionario } from 'src/app/core/funcionario';
export class FaltasFuncionario{
    id:number;
	descricao:string;
	jutificativaFalta:string;
	dataCadastro:Date;
	dataFaltaFuncionario:Date;
	funcionarioFaltou:Funcionario;
	funcionarioCadastrouFalta:Funcionario;
	usuarioAlteracao:number;
}