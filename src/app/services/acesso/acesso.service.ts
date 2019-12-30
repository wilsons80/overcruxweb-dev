import { CadastroAcesso } from '../../core/cadastro-acesso';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


const acessoRootPath = 'api/acesso/';
const menuRootPath = 'api/menu/';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  constructor(private http: HttpClient) { }
  
  getMenuPrincipal(){
    return this.http.get(menuRootPath);
  }

  getPerfilAcessoDoUsuario(idUsuario: number|string, idModulo: number|string){
    if (!idUsuario) { idUsuario = ''; }
    if (!idModulo) { idModulo = ''; }

    return this.http.get(acessoRootPath + `perfil/unidadelogada`, {params: {
       usuario: `${idUsuario}`,
       modulo: `${idModulo}`
    }});
  }

  cadastrarAll(cadastroAcesso: CadastroAcesso[]){
    return this.http.post(acessoRootPath + 'all' , cadastroAcesso);
  }

  cadastrarAcesso(cadastroAcesso: CadastroAcesso){
    return this.http.post(acessoRootPath , cadastroAcesso);
  }

  alterar(cadastroAcesso: CadastroAcesso){
    return this.http.put(acessoRootPath , cadastroAcesso);
  }
  
  excluir(idUsuarioGrupo:number){
    return this.http.delete(acessoRootPath + `${idUsuarioGrupo}`);
  }
  
  getPerfilAcesso(nomeModulo:String){
    return this.http.get(acessoRootPath + `modulo/${nomeModulo}`);
  }


  
  // public List<PerfilAcessoTO> getPerfilAcesso(@PathVariable(name = "modulo") Long idModulo) {
	// 	return getPerfilAcessoCmd.getPerfilAcesso(idModulo);
	// }


}
