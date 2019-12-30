import { Component, OnInit } from '@angular/core';
import { animacaoMenu } from 'src/app/animations';
import { MenuPrincipalService } from 'src/app/services/menuPrincipal/menu-principal.service';
import { ControleMenuService } from 'src/app/services/controle-menu/controle-menu.service';
import { Modulos } from 'src/app/core/modulos';

@Component({
  selector: 'menu-gestao-financeira',
  templateUrl: './menu-gestao-financeira.component.html',
  styleUrls: ['./menu-gestao-financeira.component.css'],
  animations: [
    animacaoMenu
  ]
})
export class MenuGestaoFinanceiraComponent implements OnInit {


  currentState = "hidden"
  isMostrarSubMenu: boolean = false;


  constructor(
    public menuPrincipalService: MenuPrincipalService,
    private controleMenuService: ControleMenuService,
  ) { }

  ngOnInit() {
  }

  toggle() {
    this.isMostrarSubMenu = !this.isMostrarSubMenu;
    if (this.isMostrarSubMenu) {
      this.currentState = 'show';
    } else
      this.currentState = 'hidden';
  }
  getIcone() {
    return this.isMostrarSubMenu ? "expand_more" : "chevron_right";
  }

  getModulos() {
    return Modulos;
  }

  verificaAcesso(modulo: Modulos) {
    return this.controleMenuService.verificaAcessoModulo(modulo);
  }

}
