import { SituacoesExAlunosService } from 'src/app/services/situacoes-ex-alunos/situacoes-ex-alunos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { TiposPublicoPrioritario } from 'src/app/core/tipos-publico-prioritario';
import { TiposPublicoPrioritarioService } from 'src/app/services/tipos-publico-prioritario/tipos-publico-prioritario.service';

@Component({
  selector: 'motivo-desligamento',
  templateUrl: './tipos-publico-prioritario.component.html',
  styleUrls: ['./tipos-publico-prioritario.component.css']
})
export class TiposPublicoPrioritarioComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  listaTiposPublicoPrioritario: TiposPublicoPrioritario[];
  tiposPublicoPrioritario: TiposPublicoPrioritario = new TiposPublicoPrioritario();
  msg:string;

  mostrarTabela = false;

  displayedColumns: string[] = ['id', 'descricao', 'acoes'];
  dataSource: MatTableDataSource<TiposPublicoPrioritario> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(
    private tiposPublicoPrioritarioService: TiposPublicoPrioritarioService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute:ActivatedRoute

  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }
  limpar() {
    this.mostrarTabela = false;
    this.tiposPublicoPrioritario = new TiposPublicoPrioritario()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.tiposPublicoPrioritario.id) {
      this.tiposPublicoPrioritarioService.getById(this.tiposPublicoPrioritario.id).subscribe((tiposPublicoPrioritario: TiposPublicoPrioritario) => {
        if(!tiposPublicoPrioritario){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [tiposPublicoPrioritario];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(tiposPublicoPrioritario: TiposPublicoPrioritario) {
    this.router.navigate(['/tipospublicoprioritario/cadastrar'], { queryParams: { id: tiposPublicoPrioritario.id } });
  }

  deletar(tiposPublicoPrioritario: TiposPublicoPrioritario) {
    this.chamaCaixaDialogo(tiposPublicoPrioritario);
  }

  chamaCaixaDialogo(tiposPublicoPrioritario: TiposPublicoPrioritario) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.tiposPublicoPrioritarioService.excluir(tiposPublicoPrioritario.id).subscribe(() => {
          this.tiposPublicoPrioritario.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.tiposPublicoPrioritarioService.getAll().subscribe((listaSituacoesExAlunos: TiposPublicoPrioritario[]) => {
      this.listaTiposPublicoPrioritario = listaSituacoesExAlunos;
      this.dataSource.data = listaSituacoesExAlunos ? listaSituacoesExAlunos : [];
      this.verificaMostrarTabela(listaSituacoesExAlunos);
    })
  }
  verificaMostrarTabela(listaSituacoesExAlunos: TiposPublicoPrioritario[]) {
    if(!listaSituacoesExAlunos ||listaSituacoesExAlunos.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhum cadastro."
    }else{
      this.mostrarTabela = true; 
    }
  }
}
