import { Atividade } from './atividade';
import { Cargo } from './cargo';
import { Funcionario } from './funcionario';

export class ColaboradoresAtividade {
    id: number;
    dtEntradaAtividade: Date;
    dtSaidaAtividade: Date;
    atividade: Atividade;
    cargo: Cargo;
    funcionario: Funcionario;
    usuariosSistema: number;
    isAtualizar:Boolean;
}