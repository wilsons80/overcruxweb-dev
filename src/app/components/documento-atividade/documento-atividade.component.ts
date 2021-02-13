import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/core/atividade';
import { DocumentoAtividade } from 'src/app/core/documento-atividade';
import { Acesso } from 'src/app/core/acesso';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { DocumentoAtividadeService } from 'src/app/services/documento-atividade/documento-atividade.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-documento-atividade',
  templateUrl: './documento-atividade.component.html',
  styleUrls: ['./documento-atividade.component.css']
})
export class DocumentoAtividadeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaAtividade: Atividade[];
  mostrarTabela = false;
  msg: string;
  atividade: Atividade;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  displayedColumns: string[] = [
    'descricao',
    'atividade',
    'acoes'
  ];
  dataSource: MatTableDataSource<DocumentoAtividade> = new MatTableDataSource();

  constructor(
    private atividadeService: AtividadeService,
    private documentoAtividadeService: DocumentoAtividadeService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.altera && !this.perfilAcesso.deleta) {
      this.displayedColumns = [
        'descricao',
        'atividade'
      ];
    }
    this.dataSource.paginator = this.paginator;
    this.atividadeService.getAll().subscribe((listaAtividade: Atividade[]) => {
      this.listaAtividade = listaAtividade;
    });

    this.documentoAtividadeService.getAll().subscribe((documentoAtividade: DocumentoAtividade[]) => {
      this.dataSource.data = documentoAtividade;
      this.mostrarTabela = true;
    });
  }

  limpar() {
    this.mostrarTabela = false;
    this.dataSource.data = [];
    this.msg = '';
  }

  consultar() {
    this.documentoAtividadeService.getPorAtividade(this.atividade.id).subscribe(
      (documentoAtividade: DocumentoAtividade[]) => {
        if (!documentoAtividade) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = documentoAtividade;
          this.mostrarTabela = true;
        }
      },
      () => {
        this.msg = 'Nenhum registro para a pesquisa selecionada';
        this.limpar();
      }
    );
  }

  atualizar(documentoAtividade: DocumentoAtividade) {
    this.router.navigate(['/documentoatividade/cadastrar'], {
      queryParams: { idDocumentoAtividade: documentoAtividade.id }
    });
  }

  deletar(documentoAtividade: DocumentoAtividade) {
    this.chamaCaixaDialogo(documentoAtividade);
  }

  chamaCaixaDialogo(documentoAtividade: DocumentoAtividade) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o documento da atividade?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.documentoAtividadeService
          .excluir(documentoAtividade.id)
          .subscribe(() => {
            this.consultar();
            this.atividade.id = null;
          });
      } else {
        dialogRef.close();
      }
    });
  }
}
