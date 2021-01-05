import { Acoes } from './acoes';
import { Programa } from './programa';
import { ColaboradoresAtividade } from './colaboradores-atividade';
import { PlanosAcao } from './planos-acao';
import { Projeto } from './projeto';
import { Unidade } from './unidade';
import { MateriaisAtividade } from './materiais-atividade';
import { TiposAtividades } from './tipos-atividades';
import { Aluno } from './aluno';

export class SituacaoExAluno {
    
    id:number;
	profissao:string;
	localTrabalho:string;
	condicaoAtual:string;
	dataAvaliacao:Date;
	aluno:Aluno;
	
}