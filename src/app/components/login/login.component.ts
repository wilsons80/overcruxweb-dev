import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Login } from 'src/app/core/login';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Menu } from './../../core/menu';
import { UsuarioLogado } from './../../core/usuario-logado';
import { AutenticadorService } from './../../services/autenticador/autenticador.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterContentChecked {

  usuario: Login = new Login();
  error: any;
  usuarioLogado: UsuarioLogado;
  hide = true;

  constructor(
    private autenticadorService: AutenticadorService,
    private menuService: MenuService,
    private router: Router,
    private drc: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.autenticadorService.isLoggedIn) {
      this.router.navigate([`unidade/escolher/`]);
    }
  }

  ngAfterContentChecked(): void {
    this.drc.detectChanges();
  }

  login() {
    this.autenticadorService.login(this.usuario).pipe(

      switchMap((usuarioLogado: UsuarioLogado) => {
        this.usuarioLogado = usuarioLogado;
        if (usuarioLogado.unidadeLogada) {
          return this.menuService.getMenuPrincipal();
        } else
          return new Observable(obs => obs.next())
      }),


    ).subscribe((menu: Menu[]) => {

      this.autenticadorService.usuarioEstaLogado = true;

      if (this.usuarioLogado.trocarSenha ) {
        this.router.navigate(['novasenha']);
      } else {
        if (this.usuarioLogado.unidades && this.usuarioLogado.unidades.length == 1) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['unidade/escolher']);
        }
      }
    },
      error => this.error = error
    );
  }

}
