import { SituacoesExAlunosService } from 'src/app/services/situacoes-ex-alunos/situacoes-ex-alunos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Doadores } from 'src/app/core/doadores';
import { DoadoresService } from 'src/app/services/doadores/doadores.service';

@Component({
  selector: 'doadores',
  templateUrl: './doadores.component.html',
  styleUrls: ['./doadores.component.css']
})
export class DoadoresComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  listaDoadores: Doadores[];
  doadores: Doadores = new Doadores();
  msg:string;

  mostrarTabela = false;

  displayedColumns: string[] = ['tipoDoador', 'nome', 'dataInicioVinculo', 'acoes'];
  dataSource: MatTableDataSource<Doadores> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(
    private doadoresService: DoadoresService,
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
    this.doadores = new Doadores()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.doadores && this.doadores.id) {
      this.doadoresService.getById(this.doadores.id).subscribe((doadores: Doadores) => {
        if(!doadores){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [doadores];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(doadores: Doadores) {
    this.router.navigate(['/tiposdoadores/cadastrar'], { queryParams: { id: doadores.id } });
  }

  deletar(doadores: Doadores) {
    this.chamaCaixaDialogo(doadores);
  }

  chamaCaixaDialogo(doadores: Doadores) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.doadoresService.excluir(doadores.id).subscribe(() => {
          this.doadores.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.doadoresService.getAll().subscribe((listaSituacoesExAlunos: Doadores[]) => {
      this.listaDoadores = listaSituacoesExAlunos;
      this.dataSource.data = listaSituacoesExAlunos ? listaSituacoesExAlunos : [];
      this.verificaMostrarTabela(listaSituacoesExAlunos);
    })
  }
  verificaMostrarTabela(listaSituacoesExAlunos: Doadores[]) {
    if(!listaSituacoesExAlunos ||listaSituacoesExAlunos.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhum cadastro."
    }else{
      this.mostrarTabela = true; 
    }
  }
}
