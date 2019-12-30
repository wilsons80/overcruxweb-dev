import { Component, OnInit } from '@angular/core';
import { Modulos } from 'src/app/core/modulos';
import { ControleMenuService } from 'src/app/services/controle-menu/controle-menu.service';
import { MenuPrincipalService } from 'src/app/services/menuPrincipal/menu-principal.service';
import { animacaoMenu } from './../../../animations';

@Component({
  selector: 'menu-pedagogico',
  templateUrl: './menu-pedagogico.component.html',
  styleUrls: ['./menu-pedagogico.component.css'],
  animations: [
    animacaoMenu
  ]
})
export class MenuPedagogicoComponent implements OnInit {

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
