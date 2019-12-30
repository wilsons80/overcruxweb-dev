import { Talento } from './talento';

export class AcaoCompetencia {
    id: number;
    descricao: string;
    resultadoAcao: string;
    resultadoPrevAcao: string;
    dataFim: Date;
    dataInicio: Date;
    talentosPf: Talento;
    usuarioAlteracao: number;
}