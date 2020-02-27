import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioSistema } from 'src/app/core/usuario-sistema';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema/usuario-sistema.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  usuarios: UsuarioSistema[];
  usuarioSistema: UsuarioSistema = new UsuarioSistema();

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['username', 'nome', 'status', 'dataInicioVigencia', 'dataFimVigencia', 'acoes'];
  dataSource: MatTableDataSource<UsuarioSistema> = new MatTableDataSource();


 perfilAcesso: Acesso;

 
 constructor(
   private usuarioSistemaService: UsuarioSistemaService,
   private router: Router,
   private dialog: MatDialog,
   private activatedRoute: ActivatedRoute
  ) {
    this.initObjetos();
  }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }

  initObjetos() {
    this.usuarioSistema = new UsuarioSistema();
    this.usuarioSistema.pessoaFisica = new PessoaFisica();
  }

  limpar() {
    this.initObjetos();
    this.mostrarTabela = false;
    this.dataSource.data = [];
  }

  consultar() {
    if (this.usuarioSistema.id) {
      this.usuarioSistemaService.getById(this.usuarioSistema.id).subscribe((usuario: UsuarioSistema) => {
        if (!usuario) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = [usuario];
          this.mostrarTabela = true;
        }
      });
    } else {
      this.getAll();
    }
  }

  atualizar(usuarioSistema: UsuarioSistema) {
    this.router.navigate(['/usuariosistema/cadastrar'], { queryParams: { id: usuarioSistema.id } });
  }

  deletar(usuarioSistema: UsuarioSistema) {
    this.chamaCaixaDialogo(usuarioSistema);
  }

  chamaCaixaDialogo(usuarioSistema: UsuarioSistema) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o usuário ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.usuarioSistemaService.excluir(usuarioSistema.id).subscribe(() => {
          this.usuarioSistema.id = null;
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    });
  }

  getAll() {
    this.usuarioSistemaService.getAll().subscribe((usuarios: UsuarioSistema[]) => {
      this.usuarios = usuarios;
      this.dataSource.data = usuarios ? usuarios : [];
      this.verificaMostrarTabela(usuarios);
    });
  }

  verificaMostrarTabela(usuarios: UsuarioSistema[]) {
    if (!usuarios || usuarios.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum usuário cadastrado.';
    } else {
      this.mostrarTabela = true;
    }
  }


}
