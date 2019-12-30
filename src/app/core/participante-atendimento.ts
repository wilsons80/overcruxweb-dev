import { Funcionario } from './funcionario';
import { Familiares } from './familiares';
import {Atendimento} from './atendimento';

export class ParticipanteAtendimento {
    id: number;
    
	atendimento: Atendimento;
	familiar: Familiares;
	funcionario: Funcionario;
    
    usuarioAlteracao: number;
}