import { MenuService } from 'src/app/services/menu/menu.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Modulo } from 'src/app/core/modulo';
import { PerfilAcessoUsuario } from 'src/app/core/perfil-acesso-usuario';
import { CadastroAcesso } from '../../core/cadastro-acesso';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { UsuarioUnidade } from './../../core/usuario-unidade';
import { AcessoService } from './../../services/acesso/acesso.service';
import { ControleMenuService } from './../../services/controle-menu/controle-menu.service';
import { ModuloService } from './../../services/modulo/modulo.service';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Acesso } from 'src/app/core/acesso';
import { switchMap } from 'rxjs/operators';
import { Menu } from 'src/app/core/menu';
import * as _ from 'lodash';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';


@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  cadastroAcesso: CadastroAcesso = new CadastroAcesso();
  perfilAcessoUsuario: PerfilAcessoUsuario;

  usuarios: UsuarioUnidade[];
  modulos: Modulo[];

  mostrarTabela = false;

  displayedColumns: string[] = ['nomeUsuario', 'nomeModulo', 'nomeUnidade', 'nomeGrupoModulo', 'acoes'];
  dataSource: MatTableDataSource<PerfilAcessoUsuario> = new MatTableDataSource();
  msg: string;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  constructor(
    private dialog: MatDialog,
    private usuarioService: UsuarioService,
    private moduloService: ModuloService,
    private activatedRoute: ActivatedRoute,
    public controleMenuService: ControleMenuService,
    private acessoService: AcessoService,
    private router: Router,
    private menuService: MenuService
  ) {
    this.carregarPerfil = new CarregarPerfil();
  }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);
    this.dataSource.paginator = this.paginator;
    this.getAll();
    this.consultar();
  }

  consultar() {
    this.acessoService.getPerfilAcessoDoUsuario(this.cadastroAcesso.idUsuario, this.cadastroAcesso.idModulo)
      .subscribe((perfilAcessoUsuario: PerfilAcessoUsuario[]) => {

        if (_.isEmpty(perfilAcessoUsuario)) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = perfilAcessoUsuario;
          this.mostrarTabela = true;
        }
      })
  }

  limpar() {
    this.cadastroAcesso.idUsuario = null;
    this.cadastroAcesso.idModulo = null;
    this.dataSource.data = [];
    this.mostrarTabela = false;
  }

  atualizar(cadastroAcesso: CadastroAcesso ) {
    this.router.navigate(['/acesso/cadastrar'], {
      queryParams: {
        idPerfilAcesso: cadastroAcesso.idPerfilAcesso,
        idInstituicao: cadastroAcesso.idInstituicao,
        idModulo: cadastroAcesso.idModulo,
        idUsuario: cadastroAcesso.idUsuario
      }
    });
  }

  deletar(perfilAcessoUsuario: PerfilAcessoUsuario) {
    this.chamaCaixaDialogo(perfilAcessoUsuario);
  }

  chamaCaixaDialogo(perfilAcessoUsuario: PerfilAcessoUsuario) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: 'Certeza que deseja excluir o acesso?',
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.acessoService.excluir(perfilAcessoUsuario.idUsuarioGrupo).pipe(
          switchMap(() => {
            this.consultar();
            return this.menuService.getMenuPrincipal();
          })

        ).subscribe((menu: Menu[]) => {
          this.controleMenuService.acessos = menu;
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }


  getAll() {
    this.usuarioService.getUsuariosPorUnidadeLogada().subscribe((usuarios: UsuarioUnidade[]) => {
      this.usuarios = usuarios;
    });

    this.moduloService.getUsuariosPorInstituicaoLogada().subscribe((modulos: Modulo[]) => {
      this.modulos = modulos;
    });
  }

}
