import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Diagnostico } from 'src/app/core/diagnostico';
import { Acesso } from 'src/app/core/acesso';
import { DiagnosticoAtendimentoService } from 'src/app/services/diagnostico-atendimento/diagnostico-atendimento.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-diagnostico-atendimento',
  templateUrl: './diagnostico-atendimento.component.html',
  styleUrls: ['./diagnostico-atendimento.component.css']
})
export class DiagnosticoAtendimentoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  diagnosticos: Diagnostico[];
  mostrarTabela = false;
  diagnostico: Diagnostico = new Diagnostico();
  msg: string;

  displayedColumns: string[] = ['descricao', 'acoes'];
  dataSource: MatTableDataSource<Diagnostico> = new MatTableDataSource();
  perfilAcesso: Acesso;


  constructor(
    private diagnosticoService: DiagnosticoAtendimentoService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.diagnostico = new Diagnostico();
    this.dataSource.data = [];
  }

  consultar() {
    if (this.diagnostico.id) {
      this.diagnosticoService.getById(this.diagnostico.id).subscribe((retorno: Diagnostico) => {
        if (!retorno) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada";
        } else {
          this.dataSource.data = [retorno];
          this.mostrarTabela = true;
        }
      });
    } else {
      this.getAll();
    }
  }


  atualizar(retorno: Diagnostico) {
    this.router.navigate(['/diagnosticoatendimento/cadastrar'], { queryParams: { id: retorno.id } });
  }

  deletar(retorno: Diagnostico) {
    this.chamaCaixaDialogo(retorno);
  }

  chamaCaixaDialogo(retorno: Diagnostico) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o diagnóstico de atendimento: ${retorno.descricao}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.diagnosticoService.excluir(retorno.id).subscribe(() => {
          this.diagnostico.id = null;
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.diagnosticoService.getAll().subscribe((retorno: Diagnostico[]) => {
      this.diagnosticos = retorno;
      this.dataSource.data = retorno ? retorno : [];
      this.verificaMostrarTabela(retorno);
    });
  }

  verificaMostrarTabela(retorno: Diagnostico[]) {
    if (!retorno || retorno.length === 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum diagnóstico de atendimento cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }

}
