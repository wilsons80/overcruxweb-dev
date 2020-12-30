import { Component, OnInit } from '@angular/core';
import { animacaoMenu } from 'src/app/animations';
import { Modulos } from 'src/app/core/modulos';
import { ControleMenuService } from 'src/app/services/controle-menu/controle-menu.service';
import { MenuPrincipalService } from 'src/app/services/menuPrincipal/menu-principal.service';


@Component({
  selector: 'sub-menu-relatorio-dp',
  templateUrl: './sub-menu-relatorio-dp.component.html',
  styleUrls: ['./sub-menu-relatorio-dp.component.css'],
  animations: [
    animacaoMenu
  ]
})
export class SubMenuRelatorioDpComponent implements OnInit {

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
