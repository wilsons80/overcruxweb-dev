import { Acoes } from './../../core/acoes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { AcoesAtividadeService } from 'src/app/services/acoes-atividade/acoes-atividade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';

@Component({
  selector: 'app-acoes-atividade',
  templateUrl: './acoes-atividade.component.html',
  styleUrls: ['./acoes-atividade.component.css']
})
export class AcoesAtividadeComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  listaAcoesAtividade: Acoes[];
  acoesAtividade: Acoes = new Acoes();
  msg: string;
  carregarPerfil: CarregarPerfil;
  perfilAcesso: Acesso = new Acesso();

  mostrarTabela = false;

  unidadesComboCadastro: any[];

  displayedColumns: string[] = ['descricao', 'dataInicio', 'dataFim', 'dataPrevisaoFim', 'dataPrevisaoInicio', 'acoes'];
  dataSource: MatTableDataSource<Acoes> = new MatTableDataSource();

  constructor(
    private acoesAtividadeService: AcoesAtividadeService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private unidadeService: UnidadeService,
  ) { 
    this.carregarPerfil = new CarregarPerfil();
  }


  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);
    this.dataSource.paginator = this.paginator;
    this.getAll();


    this.unidadeService.getAllByInstituicaoDaUnidadeLogada().subscribe((unidades: any[]) => {
      this.unidadesComboCadastro = unidades;
    });
  }


  limpar() {
    this.mostrarTabela = false;
    this.acoesAtividade = new Acoes()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.acoesAtividade.id) {
      this.acoesAtividadeService.getById(this.acoesAtividade.id).subscribe((acoesAtividade: Acoes) => {
        if (!acoesAtividade){
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = [acoesAtividade];
          this.mostrarTabela = true;
        }
      });
    } else {
      this.getAll();
    }
  }


  atualizar(acoesAtividade: Acoes) {
    this.router.navigate(['/acoesoficinas/cadastrar'], { queryParams: { codigoacao: acoesAtividade.id } });
  }

  deletar(acoesAtividade: Acoes) {
    this.chamaCaixaDialogo(acoesAtividade);
  }

  chamaCaixaDialogo(acoesAtividade: Acoes) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a ação atividade?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.acoesAtividadeService.excluir(acoesAtividade.id).subscribe(() => {
          this.acoesAtividade.id = null;
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    }
    );
  }

   getAll() {
    this.acoesAtividadeService.getAll().subscribe((listaAcoesAtividade: Acoes[]) => {
      this.listaAcoesAtividade = listaAcoesAtividade;
      this.dataSource.data = listaAcoesAtividade ? listaAcoesAtividade : [];
      this.verificaMostrarTabela(listaAcoesAtividade);
    });
  }

  verificaMostrarTabela(listaAcoesAtividade: Acoes[]) {
    if(!listaAcoesAtividade || listaAcoesAtividade.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma ação cadastrada.';
    } else {
      this.mostrarTabela = true;
    }
  }
}
