import { SituacoesExAlunosService } from 'src/app/services/situacoes-ex-alunos/situacoes-ex-alunos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { MotivoDesligamento } from 'src/app/core/motivo-desligamento';
import { MotivoDesligamentoService } from 'src/app/services/motivo-desligamento/motivo-desligamento.service';

@Component({
  selector: 'motivo-desligamento',
  templateUrl: './motivo-desligamento.component.html',
  styleUrls: ['./motivo-desligamento.component.css']
})
export class MotivoDesligamentoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  listaMotivoDesligamento: MotivoDesligamento[];
  motivoDesligamento: MotivoDesligamento = new MotivoDesligamento();
  msg:string;

  mostrarTabela = false;

  displayedColumns: string[] = ['id', 'motivoDesligamento', 'acoes'];
  dataSource: MatTableDataSource<MotivoDesligamento> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(
    private motivoDesligamentoService: MotivoDesligamentoService,
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
    this.motivoDesligamento = new MotivoDesligamento()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.motivoDesligamento && this.motivoDesligamento.id) {
      this.motivoDesligamentoService.getById(this.motivoDesligamento.id).subscribe((motivoDesligamento: MotivoDesligamento) => {
        if(!motivoDesligamento){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [motivoDesligamento];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(motivoDesligamento: MotivoDesligamento) {
    this.router.navigate(['/motivosdesligamentos/cadastrar'], { queryParams: { id: motivoDesligamento.id } });
  }

  deletar(motivoDesligamento: MotivoDesligamento) {
    this.chamaCaixaDialogo(motivoDesligamento);
  }

  chamaCaixaDialogo(motivoDesligamento: MotivoDesligamento) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.motivoDesligamentoService.excluir(motivoDesligamento.id).subscribe(() => {
          this.motivoDesligamento.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.motivoDesligamentoService.getAll().subscribe((listaSituacoesExAlunos: MotivoDesligamento[]) => {
      this.listaMotivoDesligamento = listaSituacoesExAlunos;
      this.dataSource.data = listaSituacoesExAlunos ? listaSituacoesExAlunos : [];
      this.verificaMostrarTabela(listaSituacoesExAlunos);
    })
  }
  verificaMostrarTabela(listaSituacoesExAlunos: MotivoDesligamento[]) {
    if(!listaSituacoesExAlunos ||listaSituacoesExAlunos.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhum cadastro."
    }else{
      this.mostrarTabela = true; 
    }
  }
}
