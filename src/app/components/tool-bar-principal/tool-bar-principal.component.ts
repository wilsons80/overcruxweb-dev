import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Menu } from 'src/app/core/menu';
import { Unidade } from 'src/app/core/unidade';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ControleMenuService } from 'src/app/services/controle-menu/controle-menu.service';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { LogoutService } from './../../services/logout/logout.service';
import { MenuService } from './../../services/menu/menu.service';
import { MenuPrincipalService } from './../../services/menuPrincipal/menu-principal.service';

@Component({
  selector: 'tool-bar-principal',
  templateUrl: './tool-bar-principal.component.html',
  styleUrls: ['./tool-bar-principal.component.css']
})
export class ToolBarPrincipalComponent implements OnInit {

  mostrarMenu = false;
  unidadeSelecionada: any[]

  constructor(
    private authGuard: AuthGuard,
    private router: Router,
    private menuPrincipalService: MenuPrincipalService,
    private unidadeService: UnidadeService,
    private logoutService: LogoutService,
    public toolbarPrincipalService: ToolbarPrincipalService,
    private menuService: MenuService,
    private controleMenuService: ControleMenuService,

  ) { }

  ngOnInit(): void {
    this.authGuard.mostrarMenu.subscribe(resultado => this.mostrarMenu = resultado);
  }

  logout() {
    this.logoutService.logout();
  }

  menuPrincipalToggle() {
    this.menuPrincipalService.expandido = !this.menuPrincipalService.expandido;
    // this.menuPrincipalService.alternar();
  }

  escolherUnidade(idUnidade: number) {
    localStorage.removeItem('logo');
    this.unidadeService.getUnidadeSetandoLogada(idUnidade).pipe(
      switchMap((unidade: Unidade) => {
        return this.menuService.getMenuPrincipal()
      })
    )
      .subscribe((menu: Menu[]) => {
        this.controleMenuService.acessos = menu;
        this.router.navigateByUrl('').then(() => this.router.navigate(['home']));
      })
  }

  getLoadingCompleto() {
    return this.toolbarPrincipalService.loadingCompleto;
  }


  goHome() {
    this.router.navigate(['home']);
  }

  getBackground() {
    if (this.toolbarPrincipalService && this.toolbarPrincipalService.logo) {
      return `url(${this.toolbarPrincipalService.logo})`

    }
  }
  naoPossuiFoto() {
    return "data:image/jpg;base64," === this.toolbarPrincipalService.logo
  }
}
