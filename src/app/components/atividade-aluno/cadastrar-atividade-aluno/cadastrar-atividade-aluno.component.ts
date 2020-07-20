import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Aluno } from 'src/app/core/aluno';
import { Atividade } from 'src/app/core/atividade';
import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { AtividadeAlunoService } from 'src/app/services/atividade-aluno/atividade-aluno.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AlunoService } from './../../../services/aluno/aluno.service';
import * as _ from 'lodash';
import { TurmasService } from 'src/app/services/turmas/turmas.service';
import { Turmas } from 'src/app/core/turmas';

@Component({
  selector: 'app-cadastrar-atividade-aluno',
  templateUrl: './cadastrar-atividade-aluno.component.html',
  styleUrls: ['./cadastrar-atividade-aluno.component.css']
})
export class CadastrarAtividadeAlunoComponent implements OnInit {

  atividadeAluno: AtividadeAluno = new AtividadeAluno();
  alunos: Aluno[];
  atividades: Atividade[];
  atividadesSemTurma: Atividade[];
  turmas: Turmas[];

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;
  tipoOficina = null;

  constructor(
    private atividadeAlunoService: AtividadeAlunoService,
    private turmaService: TurmasService,
    private alunoService: AlunoService,
    private atividadeService: AtividadeService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) {
  }


  ngOnInit() {

    this.limpar();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
    });

    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividadesSemTurma = atividades.filter(a => !a.idTurma);
      this.carregarOficinas();
    });

    this.turmaService.getAll().subscribe((turmas: Turmas[]) => {
      this.turmas = turmas;
      this.carregarOficinas();
    });


    let idAtividadeAluno: number;
    idAtividadeAluno = this.activatedRoute.snapshot.queryParams.idAtividadeAluno ?
      this.activatedRoute.snapshot.queryParams.idAtividadeAluno : null;

    if (idAtividadeAluno) {
      this.isAtualizar = true;
      this.atividadeAlunoService.getById(idAtividadeAluno).subscribe((atividadeAluno: AtividadeAluno) => {
        this.atividadeAluno = atividadeAluno;

        if (this.atividadeAluno.atividade.idTurma) {
          this.tipoOficina = 'T';
        } else {
          this.tipoOficina = 'O';
        }
        this.carregarOficinas();
      });
    }

  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) { return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }

  cadastrar() {
    if (!this.validarDatas() ) { return; }

    this.atividadeAlunoService.cadastrar(this.atividadeAluno).subscribe(() => {
      this.router.navigate(['atividadealuno']);
      this.toastService.showSucesso('Atividade aluno cadastrada com sucesso');
    });
  }

  private getValorByDate(valor) {
    if(valor === null || valor === undefined) return null;

    if(valor && valor instanceof Date) {
      const data = valor.toLocaleDateString().split('/');
      return new Date(data[2]+'-'+data[1]+'-'+data[0]);
    }

    if(valor && !(valor instanceof Date)) {
      const dataString = new Date(valor).toLocaleDateString();
      const data = dataString.split('/');
      return new Date(data[2]+'-'+data[1]+'-'+data[0]);
    }
  }


  validarDatas(): boolean {
    const dataInicioAtividade     = this.getValorByDate(this.atividadeAluno.atividade.dataInicio);
    const dataFimAtividade        = this.getValorByDate(this.atividadeAluno.atividade.dataFim);

    const dataIncioMatricula          = this.getValorByDate(this.atividadeAluno.dataInicioAtividade);
    const dataDesvinculacaoMatricula  = this.getValorByDate(this.atividadeAluno.dataDesvinculacao);

    
    if (dataIncioMatricula && dataIncioMatricula.getTime() < dataInicioAtividade.getTime()) {
      this.toastService.showAlerta('A data de início informada não pode ser menor que a data de início da atividade selecionada.');
      return false;
    }

    if (dataFimAtividade) {
      if (dataIncioMatricula && dataIncioMatricula.getTime() > dataFimAtividade.getTime()) {
        this.toastService.showAlerta('A data de início informada não pode ser menor que a data de início da atividade selecionada.');
        return false;
      }
    }

    if (dataFimAtividade && dataDesvinculacaoMatricula &&
        dataDesvinculacaoMatricula.getTime() > dataFimAtividade.getTime()) {
      this.toastService.showAlerta('A data de desvinculação informada não pode ser maior que a data de fim da atividade selecionada.');
      return false;
    }

    if (dataDesvinculacaoMatricula &&
        dataDesvinculacaoMatricula.getTime() < dataInicioAtividade.getTime()) {
      this.toastService.showAlerta('A data de desvinculação informada não pode ser menor que a data de início da atividade selecionada.');
      return false;
    }

    if (dataDesvinculacaoMatricula && dataIncioMatricula &&
      dataDesvinculacaoMatricula.getTime() < dataIncioMatricula.getTime()) {
      this.toastService.showAlerta('A data de desvinculação não pode ser menor que a data de inicio.');
      return false;
    }

    return true;
  }


  limpar() {
    this.atividadeAluno = new AtividadeAluno();
    this.atividadeAluno.aluno = new Aluno();
    this.atividadeAluno.atividade = new Atividade();
    this.tipoOficina = null;
  }

  cancelar() {
    this.router.navigate(['atividadealuno']);
  }


  atualizar() {
    if (!this.validarDatas() ) { return; }

    this.atividadeAlunoService.alterar(this.atividadeAluno).subscribe(() => {
      this.router.navigate(['atividadealuno']);
      this.toastService.showSucesso('Atividade aluno atualizado com sucesso');
    });

  }

  mostrarDadosAluno(idAluno) {
    this.atividadeAluno.aluno = _.cloneDeep(_.find(this.alunos, (a: Aluno) => a.id === idAluno));
  }

  mostrarDadosAtividade(idAtividade) {
    this.atividadeAluno.atividade = _.cloneDeep(_.find(this.atividades, (a: Atividade) => a.id === idAtividade));
  }

  carregarOficinas() {
    this.atividades = [];
    if (this.isTurma() && this.atividadeAluno.atividade.idTurma && this.turmas) {
      const turma = this.turmas.find(t => t.id === this.atividadeAluno.atividade.idTurma);
      this.atividades = turma.oficinas;
    }

    if (this.isOficina()) {
      this.atividades = this.atividadesSemTurma;
    }
  }

  isTurma() {
    return this.tipoOficina === 'T';
  }

  isOficina() {
    return this.tipoOficina === 'O';
  }
}
