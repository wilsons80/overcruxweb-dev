import { TempoSessaoService } from 'src/app/services/tempo-sessao/tempo-sessao.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutenticadorService } from '../autenticador/autenticador.service';
import { MenuPrincipalService } from '../menuPrincipal/menu-principal.service';
import { Router } from '@angular/router';
import { ToolbarPrincipalService } from '../toolbarPrincipal/toolbar-principal.service';


const rootPath = 'api/logout';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    private http: HttpClient,
    private autenticadorService:AutenticadorService,
    private menuPrincipalService:MenuPrincipalService,
    private router:Router,
    private toolbarPrincipalService:ToolbarPrincipalService,
    private tempoSessaoService:TempoSessaoService
    ) { }

  logoutService(){
    return this.http.post(rootPath,{});
  }

  logout(){
    this.logoutService().subscribe(() => {
      this.autenticadorService.logout();
      this.menuPrincipalService.logout();
      this.router.navigate(['login']);
      this.toolbarPrincipalService.apagaPropriedadesdoUsuarioLogado();
      this.tempoSessaoService.tempoSessao = 0;
    });
  }

}
