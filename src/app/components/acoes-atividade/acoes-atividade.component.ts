import { Atividade } from './../../core/atividade';
import { Unidade } from './../../core/unidade';
import { Turmas } from 'src/app/core/turmas';
import { TurmasService } from './../../services/turmas/turmas.service';
import { Acoes } from './../../core/acoes';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import { Acesso } from 'src/app/core/acesso';
import { AcoesAtividadeService } from 'src/app/services/acoes-atividade/acoes-atividade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { TipoTurno } from 'src/app/core/tipo-turno';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';

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

  unidadeSelecionada: Unidade = new Unidade();
  turmaSelecionada: Turmas = new Turmas();
  oficinaSelecionada: Atividade = new Atividade();

  unidadesComboCadastro: any[];
  turmasCombo: Turmas[];
  oficinasCombo: Atividade[];

  turnos: TipoTurno = new TipoTurno();

  displayedColumns: string[] = ['descricao', 'dataInicio', 'dataFim', 'dataPrevisaoFim', 'dataPrevisaoInicio', 'acoes'];
  dataSource: MatTableDataSource<Acoes> = new MatTableDataSource();

  constructor(
    private acoesAtividadeService: AcoesAtividadeService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private unidadeService: UnidadeService,
    private turmaService: TurmasService,
    private oficinaService: AtividadeService
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

    this.turmaService.getFilter(null, null, null).subscribe((turmas: Turmas[]) => {
      this.turmasCombo = turmas;
    });


    this.oficinaService.getAll().subscribe((oficinas: Atividade[]) => {
      this.oficinasCombo = oficinas;
    });

  }


  limpar() {
    this.mostrarTabela = false;
    this.dataSource.data = [];

    this.acoesAtividade = new Acoes();
    this.unidadeSelecionada = new Unidade();
    this.turmaSelecionada = new Turmas();
    this.oficinaSelecionada = new Atividade();
  }

  consultar() {
    if (this.unidadeSelecionada.idUnidade ||
        this.turmaSelecionada.id ||
        this.oficinaSelecionada.id ||
        this.acoesAtividade.id) {

      this.acoesAtividadeService.getFilter(this.unidadeSelecionada.idUnidade,
                                           this.turmaSelecionada.id,
                                           this.oficinaSelecionada.id,
                                           this.acoesAtividade.id)
      .subscribe((acoesAtividade: Acoes[]) => {
        if (!acoesAtividade) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = acoesAtividade ? acoesAtividade : [];
          this.mostrarTabela = true;
        }
      });
    } else {
      this.getAll();
    }
  }

  carregarTurmas() {
    this.turmaService.getFilter(null, null, this.unidadeSelecionada.idUnidade).subscribe((turmas: Turmas[]) => {
      this.turmasCombo = turmas;
    });
  }

  carregarOficinas() {
    if(this.turmaSelecionada.id) {
      this.oficinaService.getByTurma(this.turmaSelecionada.id).subscribe((oficinas: Atividade[]) => {
        this.oficinasCombo = oficinas;
      });
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
