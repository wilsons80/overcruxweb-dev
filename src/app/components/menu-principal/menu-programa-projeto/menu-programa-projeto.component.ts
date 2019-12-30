import { Component, OnInit } from '@angular/core';
import { animacaoMenu } from './../../../animations';
import { MenuPrincipalService } from 'src/app/services/menuPrincipal/menu-principal.service';
import { ControleMenuService } from 'src/app/services/controle-menu/controle-menu.service';
import { Modulos } from 'src/app/core/modulos';

@Component({
  selector: 'menu-programa-projeto',
  templateUrl: './menu-programa-projeto.component.html',
  styleUrls: ['./menu-programa-projeto.component.css'],
  animations: [
    animacaoMenu
  ]
})
export class MenuProgramaProjetoComponent implements OnInit {

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
