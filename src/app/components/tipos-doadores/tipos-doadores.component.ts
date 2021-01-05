import { SituacoesExAlunosService } from 'src/app/services/situacoes-ex-alunos/situacoes-ex-alunos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { TiposDoadores } from 'src/app/core/tipos-doadores';
import { TiposDoadoresService } from 'src/app/services/tipos-doadores/tipos-doadores.service';

@Component({
  selector: 'tipos-doadores',
  templateUrl: './tipos-doadores.component.html',
  styleUrls: ['./tipos-doadores.component.css']
})
export class TiposDoadoresComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  listaTiposDoadores: TiposDoadores[];
  tiposDoadores: TiposDoadores = new TiposDoadores();
  msg:string;

  mostrarTabela = false;

  displayedColumns: string[] = ['codigo', 'descricao', 'acoes'];
  dataSource: MatTableDataSource<TiposDoadores> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(
    private tiposDoadoresService: TiposDoadoresService,
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
    this.tiposDoadores = new TiposDoadores()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.tiposDoadores && this.tiposDoadores.id) {
      this.tiposDoadoresService.getById(this.tiposDoadores.id).subscribe((tiposDoadores: TiposDoadores) => {
        if(!tiposDoadores){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [tiposDoadores];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(tiposDoadores: TiposDoadores) {
    this.router.navigate(['/tiposdoadores/cadastrar'], { queryParams: { id: tiposDoadores.id } });
  }

  deletar(tiposDoadores: TiposDoadores) {
    this.chamaCaixaDialogo(tiposDoadores);
  }

  chamaCaixaDialogo(tiposDoadores: TiposDoadores) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.tiposDoadoresService.excluir(tiposDoadores.id).subscribe(() => {
          this.tiposDoadores.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.tiposDoadoresService.getAll().subscribe((listaSituacoesExAlunos: TiposDoadores[]) => {
      this.listaTiposDoadores = listaSituacoesExAlunos;
      this.dataSource.data = listaSituacoesExAlunos ? listaSituacoesExAlunos : [];
      this.verificaMostrarTabela(listaSituacoesExAlunos);
    })
  }
  verificaMostrarTabela(listaSituacoesExAlunos: TiposDoadores[]) {
    if(!listaSituacoesExAlunos ||listaSituacoesExAlunos.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhum cadastro."
    }else{
      this.mostrarTabela = true; 
    }
  }
}
