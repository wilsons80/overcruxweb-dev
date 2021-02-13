import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { SituacoesVulnerabilidade } from 'src/app/core/situacoes-vulnerabilidade';
import { SituacaoVulnerabilidadeService } from 'src/app/services/situacao-vulnerabilidade/situacao-vulnerabilidade.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-situacao-vulnerabilidade',
  templateUrl: './situacao-vulnerabilidade.component.html',
  styleUrls: ['./situacao-vulnerabilidade.component.css']
})
export class SituacaoVulnerabilidadeComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  situacoes: SituacoesVulnerabilidade[];
  mostrarTabela = false;
  situacao: SituacoesVulnerabilidade = new SituacoesVulnerabilidade();
  msg: string;


  displayedColumns: string[] = ['descricao', 'acoes'];


  dataSource: MatTableDataSource<SituacoesVulnerabilidade> = new MatTableDataSource();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();


  constructor(
    private situacaoService: SituacaoVulnerabilidadeService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.situacao = new SituacoesVulnerabilidade();
    this.dataSource.data = [];
  }

  consultar() {
    if (this.situacao.id) {
      this.situacaoService.getById(this.situacao.id).subscribe((situacao: SituacoesVulnerabilidade) => {
        if (!situacao) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada";
        } else {
          this.dataSource.data = [situacao];
          this.mostrarTabela = true;
        }
      });
    } else {
      this.getAll();
    }
  }


  atualizar(situacao: SituacoesVulnerabilidade) {
    this.router.navigate(['/situacaovulnerabilidade/cadastrar'], { queryParams: { idSituacao: situacao.id } });
  }

  deletar(situacao: SituacoesVulnerabilidade) {
    this.chamaCaixaDialogo(situacao);
  }

  chamaCaixaDialogo(situacao: SituacoesVulnerabilidade) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a situação de vulnerabilidade ${situacao.descricao}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.situacaoService.excluir(situacao.id).subscribe(() => {
          this.situacao.id = null;
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.situacaoService.getAll().subscribe((situacoes: SituacoesVulnerabilidade[]) => {
      this.situacoes = situacoes;
      this.dataSource.data = situacoes ? situacoes : [];
      this.verificaMostrarTabela(situacoes);
    });
  }

  verificaMostrarTabela(situacoes: SituacoesVulnerabilidade[]) {
    if (!situacoes || situacoes.length === 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma situação de vulnerabilidade cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }

}
