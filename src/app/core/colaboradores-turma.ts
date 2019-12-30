import { Funcionario } from './funcionario';
import { Cargo } from './cargo';

export class ColaboradoresTurma {

	id: number;
	dataEntradaTurma: Date;
	dataSaidaTurma: Date;
	
	cargo: Cargo;
	funcionario: Funcionario;
	
	idTurma: number;
	usuarioAlteracao: number;

}
