import { Atividade } from 'src/app/core/atividade';
export class DocumentoAtividade{
    id:number;
	descricao:string;
	observacao:string;
	atividade:Atividade;
	usuarioAlteracao:number;
}