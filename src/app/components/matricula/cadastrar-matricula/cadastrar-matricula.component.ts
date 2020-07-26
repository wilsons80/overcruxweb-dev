import { AtividadeAlunoService } from 'src/app/services/atividade-aluno/atividade-aluno.service';
import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { TurmasService } from './../../../services/turmas/turmas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Acesso } from 'src/app/core/acesso';
import { Aluno } from 'src/app/core/aluno';
import { Atividade } from 'src/app/core/atividade';
import { Turmas } from 'src/app/core/turmas';
import { AlunosTurma } from 'src/app/core/alunos-turma';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MatriculaService } from 'src/app/services/matricula/matricula.service';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cadastrar-matricula',
  templateUrl: './cadastrar-matricula.component.html',
  styleUrls: ['./cadastrar-matricula.component.css']
})
export class CadastrarMatriculaComponent implements OnInit {

  matricula: AlunosTurma = new AlunosTurma();
  alunos: Aluno[];
  aluno: Aluno = new Aluno();

  turmas: Turmas[];
  turma: Turmas = new Turmas();

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;
  localMatricula = null;

  oficinasSelecionadas = new FormControl();

  constructor(
    private matriculasService: MatriculaService,
    private atividadeAlunoService: AtividadeAlunoService,
    private turmasService: TurmasService,
    private alunoService: AlunoService,
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

    this.turmasService.getAll().subscribe((turmas: Turmas[]) => {
      this.turmas = turmas;
    });

    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
    });

    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.matriculasService.getById(id).subscribe((matricula: AlunosTurma) => {
        this.matricula = matricula;
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

    this.matriculasService.cadastrar(this.matricula).subscribe(() => {
      this.router.navigate(['matriculas']);
      this.toastService.showSucesso('Matricula do aluno cadastrada com sucesso!');
    });
  }

  validarDatas(): boolean {
    let dataValida = true;

    if (this.matricula.oficinas) {
      this.matricula.oficinas.forEach(oficina => {
        if (oficina.dataInicioAtividade &&
            new Date(oficina.dataInicioAtividade).getTime() < new Date(this.matricula.dataInicio).getTime()) {
           this.toastService.showAlerta('Oficina não pode ter data de início menor que a data de início da turma.');
           dataValida = false;
        }
      });
    }

    return dataValida;
  }

  limpar() {
    this.matricula = new AlunosTurma();
    this.matricula.aluno = new Aluno();
    this.matricula.turma = new Turmas();
    this.matricula.oficinas = [];
    this.aluno = new Aluno();
    this.turma = new Turmas();
    this.localMatricula = null;
  }

  cancelar() {
    this.router.navigate(['matriculas']);
  }


  atualizar() {
    if (!this.validarDatas() ) { return; }

    this.matriculasService.alterar(this.matricula).subscribe(() => {
      this.router.navigate(['matriculas']);
      this.toastService.showSucesso('Matricula do aluno atualizada com sucesso!');
    });

  }

  mostrarDadosAluno(idAluno) {
    this.matricula.aluno = _.cloneDeep(_.find(this.alunos, (a: Aluno) => a.id === idAluno));
  }

  carregarDadosTurma() {
    if (this.matricula.turma.id) {
      this.matricula.turma = _.cloneDeep(_.find(this.turmas, (t: Turmas) => t.id === this.matricula.turma.id));
    }
  }

  novaMatricula() {
    const nova: AtividadeAluno = new AtividadeAluno();
    nova.aluno = this.matricula.aluno;
    nova.atividade = new Atividade();
    this.matricula.oficinas.push(nova);
  }

  deletarOficina(oficina: AtividadeAluno) {
    const index = this.matricula.oficinas.indexOf( this.matricula.oficinas.find(reg => reg === oficina));
    if (index >= 0) {
      this.matricula.oficinas.splice(index, 1);

      if (oficina.id) {
        this.atividadeAlunoService.excluir(oficina.id).subscribe(() => {
          this.toastService.showSucesso('Oficina apagada com sucesso.');
        });
      }
    }
  }

  getDadosTurma(turma: Turmas) {
    return turma.descricao + (turma.programa ? ' - Programa: ' + turma.programa.nome : '') + 
           (turma.projeto ? ' - Projeto: ' + turma.projeto.nome : '') +
           ' - Turno: ' + turma.turno;
  }


  

}
