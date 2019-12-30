import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Avaliacao } from 'src/app/core/avaliacao';
import { AvaliacaoAtividadeService } from 'src/app/services/avaliacao-atividade/avaliacao-atividade.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { Atividade } from 'src/app/core/atividade';

@Component({
  selector: 'app-avaliacao-atividade',
  templateUrl: './avaliacao-atividade.component.html',
  styleUrls: ['./avaliacao-atividade.component.css']
})
export class AvaliacaoAtividadeComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  avaliacoes: Avaliacao[];
  atividades: Atividade[];
  mostrarTabela = false;
  avaliacao: Avaliacao = new Avaliacao();
  msg: string;

  displayedColumns: string[] = ['nome', 'dataInicio', 'dataFim', 'acoes'];

  dataSource: MatTableDataSource<Avaliacao> = new MatTableDataSource();

  constructor(
    private avaliacaoService: AvaliacaoAtividadeService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }
 

  limpar() {
    this.mostrarTabela = false;
    this.avaliacao = new Avaliacao()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.avaliacao.id) {
      this.avaliacaoService.getById(this.avaliacao.id).subscribe((avaliacao: Avaliacao) => {
        if(!avaliacao){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada";
        } else {
          this.dataSource.data = [avaliacao];
          this.mostrarTabela = true;
        }
      });
    } else {
      this.getAll();
    }
  }


  atualizar(avaliacao: Avaliacao) {
    this.router.navigate(['/avaliacaoatividade/cadastrar'], { queryParams: { id: avaliacao.id } });
  }

  deletar(avaliacao: Avaliacao) {
    this.chamaCaixaDialogo(avaliacao);
  }

  chamaCaixaDialogo(avaliacao: Avaliacao) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a avaliação: ${avaliacao.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.avaliacaoService.excluir(avaliacao.id).subscribe(() => {
          this.avaliacao.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.avaliacaoService.getAll().subscribe((avaliacoes: Avaliacao[]) => {
      this.avaliacoes = avaliacoes
      this.dataSource.data = avaliacoes ? avaliacoes : [];
      this.verificaMostrarTabela(avaliacoes);
    })
  }
 
  verificaMostrarTabela(avaliacoes: Avaliacao[]) {
    if(!avaliacoes || avaliacoes.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhuma avaliação cadastrada.";
    } else{
      this.mostrarTabela = true;
    }
  }

}
