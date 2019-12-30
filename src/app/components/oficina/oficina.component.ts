import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Atividade } from 'src/app/core/atividade';
import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'oficina',
  templateUrl: './oficina.component.html',
  styleUrls: ['./oficina.component.css']
})
export class OficinaComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  oficinas: Atividade[];
  oficina: Atividade = new Atividade();

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['descricao', 'datainicio', 'datafim', 'maxparticipantes', 'projeto', 'acoes'];
  dataSource: MatTableDataSource<Atividade> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(
    private oficinaService: AtividadeService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;

    this.consultar();
  }


  limpar() {
    this.mostrarTabela = false;
    this.dataSource.data = [];
    this.msg = '';

    this.oficina = new Atividade();
  }

  consultar() {
    if (this.oficina.id) {
      this.oficinaService.getById(this.oficina.id).subscribe((oficina: Atividade) => {
        if (!oficina) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = oficina ? [oficina] : [];
          this.mostrarTabela = true;
          this.verificaMostrarTabela([oficina]);
        }
      });
    } else {
      this.oficinaService.getAll().subscribe((oficinas: Atividade[]) => {
        oficinas = oficinas.filter(o => !o.idTurma);

        this.dataSource.data = oficinas ? oficinas : [];
        this.mostrarTabela = true;
        this.verificaMostrarTabela(oficinas);
      });
    }
  }


  verificaMostrarTabela(oficinas: Atividade[]) {
    if (!oficinas || oficinas.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma oficina cadastrada.';
    } else {
      this.mostrarTabela = true;
    }
  }


  atualizar(oficina: Atividade) {
    this.router.navigate(['/oficinas/cadastrar'], { queryParams: { id: oficina.id } });
  }

  deletar(oficina: Atividade) {
    this.chamaCaixaDialogo(oficina);
  }

  chamaCaixaDialogo(oficina: Atividade) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a oficina ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.oficinaService.excluir(oficina.id).subscribe(() => {
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    }
    );
  }

}
