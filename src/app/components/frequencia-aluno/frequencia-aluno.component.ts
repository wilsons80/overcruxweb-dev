import { FrequenciaAluno } from 'src/app/core/frequencia-aluno';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Atividade } from 'src/app/core/atividade';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { Acesso } from 'src/app/core/acesso';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { FrequenciaAlunoService } from 'src/app/services/frequencia-aluno/frequencia-aluno.service';
import { AtividadeAlunoService } from 'src/app/services/atividade-aluno/atividade-aluno.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Aluno } from 'src/app/core/aluno';
import * as _ from 'lodash';
import { Moment } from 'moment';

class FiltroBusca {
  dataReferencia: Moment;
  atividade: Atividade = new Atividade();
}

@Component({
  selector: 'frequencia-aluno',
  templateUrl: './frequencia-aluno.component.html',
  styleUrls: ['./frequencia-aluno.component.css']
})
export class FrequenciaAlunoComponent implements OnInit {

  public maskData = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  // Campos de busca
  filtroBusca: FiltroBusca = new FiltroBusca();

  frequenciaAluno: FrequenciaAluno = new FrequenciaAluno();
  frequenciasAluno: FrequenciaAluno[];

  maxDate = new Date(9999, 12, 31);
  minDate = new Date(1111, 1, 1);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  atividadesAlunos: AtividadeAluno[];
  atividades: Atividade[];

  msg: string;
  perfilAcesso: Acesso;

  mostrarBotaoGerarListaFrequencia = false;
  mostrarTabela = false;
  displayedColumns: string[] = ['nome', 'matriculaAluno', 'datafrequencia', 'justificativa', 'frequencia',  'acoes'];
  dataSource: MatTableDataSource<FrequenciaAluno> = new MatTableDataSource();

  constructor(
    private frequenciaAlunoService: FrequenciaAlunoService,
    private atividadeAlunoService: AtividadeAlunoService,
    private atividadeService: AtividadeService,
    private toastService: ToastService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.limpar();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = data.atividadesAluno.aluno.pessoaFisica.nome +
                      data.atividadesAluno.aluno.matriculaAluno +
                      data.dataFrequencia +
                      data.justificativa +
                      data.frequencia;
      return dataStr.toUpperCase().indexOf(filter.toUpperCase()) !== -1;
    };

    this.atividadeService.getAllVigentesAndPassadas().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  limpar() {
    this.filtroBusca = new FiltroBusca();
    this.mostrarTabela = false;
    this.msg = null;
    this.dataSource.data = [];
    this.frequenciasAluno = [];
    this.frequenciaAluno = new FrequenciaAluno();
  }

  editar(frequenciaAluno: FrequenciaAluno) {
    frequenciaAluno.disabilitado = !frequenciaAluno.disabilitado;
  }

  atualizar() {
    this.frequenciaAlunoService.alterarAll(this.frequenciasAluno, this.filtroBusca.atividade.id, this.filtroBusca.dataReferencia)
    .subscribe(() => {
      this.toastService.showSucesso('Frequência de alunos atualizada com sucesso');
    });

    this.frequenciasAluno.forEach(u => u.disabilitado = true);
  }


  deletar(frequenciaAluno: FrequenciaAluno) {
    this.chamaCaixaDialogo(frequenciaAluno);
  }

  chamaCaixaDialogo(frequenciaAluno: FrequenciaAluno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a frequencia do aluno ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.excluir(frequenciaAluno);
      } else {
        dialogRef.close();
      }
    });
  }

  gerarListaFrequencia() {
    if (this.filtroBusca.dataReferencia === undefined) {
      this.toastService.showAlerta('Informe a data de frequência.');
      return;
    }

    this.frequenciaAlunoService.getAlunosMatriculados(this.filtroBusca.atividade.id,
                                                      this.filtroBusca.dataReferencia)
    .subscribe((frequenciasAluno: FrequenciaAluno[]) => {
        this.frequenciasAluno = frequenciasAluno ? frequenciasAluno : [];
        this.dataSource.data = this.frequenciasAluno;
        this.mostrarTabela = true;

        this.frequenciasAluno.forEach(u => u.disabilitado = !!u.id);
    });
  }

  consultar() {
    if (this.filtroBusca.dataReferencia === undefined) {
      this.toastService.showAlerta('Informe a data de frequência.');
      return;
    }

    this.frequenciaAlunoService.getListaFrequencia(this.filtroBusca.atividade.id, this.filtroBusca.dataReferencia)
    .subscribe((frequenciasAluno: FrequenciaAluno[]) => {
        this.frequenciasAluno = frequenciasAluno ? frequenciasAluno : [];
        this.dataSource.data = this.frequenciasAluno;

        this.mostrarBotaoGerarListaFrequencia = true;
        this.mostrarTabela = false;
        if (this.frequenciasAluno.length > 0) {
          this.mostrarTabela = true;
        }

        this.frequenciasAluno.forEach(u => u.disabilitado = true);
    });
  }

  isFiltroPreenchido() {
    return this.filtroBusca.dataReferencia && this.filtroBusca.atividade.id;
  }


  novo() {
    this.mostrarTabela = true;
    this.frequenciaAluno = new FrequenciaAluno();
    this.frequenciaAluno.atividadesAluno = new AtividadeAluno();
    this.frequenciaAluno.atividadesAluno.aluno = new Aluno();
    this.frequenciaAluno.atividadesAluno.atividade = new Atividade();

    if (this.frequenciasAluno === undefined) {
      this.frequenciasAluno = [];
    }

    this.frequenciaAluno.dataFrequencia = this.filtroBusca.dataReferencia.toDate();
    this.frequenciaAluno.frequencia = true;

    this.frequenciasAluno.push(this.frequenciaAluno);
    this.dataSource.data = this.frequenciasAluno;
  }

  private excluir(frequenciaAluno) {
    this.frequenciasAluno = this.frequenciasAluno.filter(a => a !== frequenciaAluno);
    this.dataSource.data = this.frequenciasAluno;
  }


  getAtividadeAluno(element: FrequenciaAluno, idAtividadeAluno) {
    const atividadeAlunoEncontrado = _.find(this.atividadesAlunos, (a: AtividadeAluno) => a.id === idAtividadeAluno);

    const alunoJaPossuiFrequenciaNessaData = _.find(this.frequenciasAluno, (frequencia: FrequenciaAluno) => frequencia.atividadesAluno.aluno.id === atividadeAlunoEncontrado.aluno.id);
    if (alunoJaPossuiFrequenciaNessaData) {
      this.toastService.showAlerta('Esse aluno já possui frequência nessa data.');
      return;
    }

    const atividadeAluno: AtividadeAluno = new AtividadeAluno();
    Object.assign(atividadeAluno, atividadeAlunoEncontrado)

    const uniformeAluno = _.find(this.frequenciasAluno, (u: FrequenciaAluno) => u === element);
    uniformeAluno.atividadesAluno = atividadeAluno;

  }

}

