import { TipoEmpresa } from 'src/app/core/tipo-empresa';
import { Empresa } from './empresa';
import { Projeto } from './projeto';
import { MateriaisProjeto } from './materiais-projeto';
import { ParceriasCategorias } from './parcerias-categorias';
import { AditivoParceriaProjeto } from './aditivo-parceria-projeto';
export class ParceriasProjeto {

    id: number;
    descricaoTipoParceria: string
    dataInicio: Date;
    dataFim: Date;
    projeto: Projeto;
    empresa: Empresa;
    tipoEmpresa: TipoEmpresa;
    valorParceria: number;
    materiaisProjeto:MateriaisProjeto[]
    parceriasCategorias:ParceriasCategorias[];
    aditivosParceriasProjeto:AditivoParceriaProjeto[]

}