import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from 'src/app/core/atendimento';
import { Acesso } from 'src/app/core/acesso';
import { AtendimentosService } from 'src/app/services/atendimentos/atendimentos.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.css']
})
export class AtendimentoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  atendimentos: Atendimento[];
  mostrarTabela: boolean = false;
  atendimento: Atendimento = new Atendimento();
  msg: string;
  perfilAcesso: Acesso;


  displayedColumns: string[] = ['DataAtendimento', 'Aluno', 'Diagnostico', 'acoes'];
  dataSource: MatTableDataSource<Atendimento> = new MatTableDataSource();

  constructor(
    private atendimentoService: AtendimentosService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.atendimento = new Atendimento()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.atendimento.id) {
      this.atendimentoService.getById(this.atendimento.id).subscribe((atendimento: Atendimento) => {
        if (!Atendimento) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [atendimento];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }

  }


  atualizar(Atendimento: Atendimento) {
    this.router.navigate(['/atendimento/cadastrar'], { queryParams: { idAtendimento: Atendimento.id } });
  }

  deletar(Atendimento: Atendimento) {
    this.chamaCaixaDialogo(Atendimento);
  }

  chamaCaixaDialogo(atendimento: Atendimento) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o atendimento ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.atendimentoService.excluir(atendimento.id).subscribe(() => {
          this.atendimento.id = null;
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.atendimentoService.getAll().subscribe((atendimentos: Atendimento[]) => {
      this.atendimentos = atendimentos;
      this.dataSource.data = atendimentos ? atendimentos : [];
      this.verificaMostrarTabela(atendimentos);
    })
  }

  verificaMostrarTabela(atendimentos: Atendimento[]) {
    if (!atendimentos || atendimentos.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum atendimento cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }


}
