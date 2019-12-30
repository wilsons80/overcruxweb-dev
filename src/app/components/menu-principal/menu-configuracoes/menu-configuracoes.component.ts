import { ControleMenuService } from './../../../services/controle-menu/controle-menu.service';
import { MenuPrincipalService } from 'src/app/services/menuPrincipal/menu-principal.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Modulos } from 'src/app/core/modulos';


@Component({
  selector: 'menu-configuracoes',
  templateUrl: './menu-configuracoes.component.html',
  styleUrls: ['./menu-configuracoes.component.css'],
  animations: [
    trigger('menuState', [
      state('hidden', style({
        visibility: 'hidden',
        opacity: 0
      })),
      state('show',   style({
        visibility: 'visible',
        opacity: 1
      })),
      transition('*=>show', animate('500ms')),
    ])
  ]
})
export class MenuConfiguracoesComponent implements OnInit {

  currentState = 'hidden';

  constructor(public menuPrincipalService: MenuPrincipalService,
              private controleMenuService: ControleMenuService
              ) { }

  isMostrarSubMenu = false;

  ngOnInit() {
  }
  
  toggle() {
    this.isMostrarSubMenu = !this.isMostrarSubMenu;
    if (this.isMostrarSubMenu){
      this.currentState = 'show';
    } else {
      this.currentState = 'hidden';
    }
  }

  getIcone(){
    return this.isMostrarSubMenu ? 'expand_more' : 'chevron_right';
  }

  getModulos() {
    return Modulos;
  }

  verificaAcesso(modulo: Modulos) {
    return this.controleMenuService.verificaAcessoModulo(modulo);
  }

}
