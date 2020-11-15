import { Acoes } from './acoes';
import { Programa } from './programa';
import { ColaboradoresAtividade } from './colaboradores-atividade';
import { PlanosAcao } from './planos-acao';
import { Projeto } from './projeto';
import { Unidade } from './unidade';
import { MateriaisAtividade } from './materiais-atividade';

export class Atividade {
    id: number;
    descricao: string;
    descricaoLocalExecucao: string;
    dataFim: Date;
    dataInicio: Date;
    horaFim: number;
    horaInicio: number;
    cargaHoraria: number;
    maximoParticipantes: number;
    domingo: string;
    localExecucao: string;
    quarta: string;
    quinta: string;
    sabado: string;
    segunda: string;
    sexta: string;
    terca: string;
    valorCustoAtividade: number;

    projeto: Projeto;
    programa: Programa;
    unidade: Unidade;

    idTurma: number;

    colaboradoresAtividade: ColaboradoresAtividade[];
    materiaisAtividade: MateriaisAtividade[];

    usuarioAlteracao: number;
}