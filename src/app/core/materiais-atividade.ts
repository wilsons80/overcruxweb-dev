import { Material } from './material';

export class MateriaisAtividade{
    
	id: number;
	observacao: string;
	valorMaterial: number;
	dataAquisicao: Date;
	dataVendaMaterial: Date;
	
	descricaoOrigemMaterial: string;
	qtdMaterial: number;
	qtdMaterialVendida: number;
	formaPagamento: string;
	idAtividade: number;
	
	material: Material;
	usuarioAlteracao: number;
    
}
