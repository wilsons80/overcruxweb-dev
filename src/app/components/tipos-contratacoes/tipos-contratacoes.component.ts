import { TiposContratacoesService } from './../../services/tipos-contratacoes/tipos-contratacoes.service';
import { TiposContratacoes } from './../../core/tipos-contratacoes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Atividade } from 'src/app/core/atividade';
import { Acesso } from 'src/app/core/acesso';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'tipos-contratacoes',
  templateUrl: './tipos-contratacoes.component.html',
  styleUrls: ['./tipos-contratacoes.component.css']
})
export class TiposContratacoesComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  listaTiposContratacoes: TiposContratacoes[];
  tiposContratacoes: TiposContratacoes = new TiposContratacoes();
  msg: string;
  perfilAcesso: Acesso;

  mostrarTabela = false;

  codigoTipoContratacao: string;
  descricaoTipoContratacao: string;

  displayedColumns: string[] = ['codigoTipoContratacao', 'descricaoTipoContratacao',  'acoes'];
  dataSource: MatTableDataSource<TiposContratacoes> = new MatTableDataSource();

  constructor(
    private tiposContratacoesService: TiposContratacoesService,
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
    this.tiposContratacoes = new TiposContratacoes()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.tiposContratacoes.id) {
      this.tiposContratacoesService.getById(this.tiposContratacoes.id).subscribe((tiposContratacoes: TiposContratacoes) => {
        if(!tiposContratacoes){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [tiposContratacoes];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(tiposContratacoes: TiposContratacoes) {
    this.router.navigate(['/tiposcontratacoes/cadastrar'], { queryParams: { idTiposContratacoes: tiposContratacoes.id } });
  }

  deletar(tiposContratacoes: TiposContratacoes) {
    this.chamaCaixaDialogo(tiposContratacoes);
  }

  chamaCaixaDialogo(tiposContratacoes: TiposContratacoes) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir tipo contratação?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.tiposContratacoesService.excluir(tiposContratacoes.id).subscribe(() => {
          this.tiposContratacoes.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

   getAll() {
    this.tiposContratacoesService.getAll().subscribe((tiposContratacoes: TiposContratacoes[]) => {
      this.listaTiposContratacoes = tiposContratacoes;
      this.dataSource.data = tiposContratacoes ? tiposContratacoes : [];
      this.verificaMostrarTabela(tiposContratacoes);
    })
  }

  verificaMostrarTabela(tiposContratacoes: TiposContratacoes[]) {
    if(!tiposContratacoes || tiposContratacoes.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhum tipo contratação cadastrado."
    }else{
      this.mostrarTabela = true; 
    }
  }
}
