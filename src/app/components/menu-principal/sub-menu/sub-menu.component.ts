import { Component, Input, OnInit } from '@angular/core';
import { MenuPrincipalService } from 'src/app/services/menuPrincipal/menu-principal.service';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';

@Component({
  selector: 'sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css']
})
export class SubMenuComponent implements OnInit {

  @Input() rota: string
  @Input() icone: string
  @Input() titulo: string
  @Input() toolTip: string

  constructor(
    public menuPrincipalService: MenuPrincipalService,
  ) { }

  ngOnInit() {
  }

  fecharMenu() {
    this.menuPrincipalService.alternar();
  }

  getRouterLink() {
    return this.rota;
  }

}
