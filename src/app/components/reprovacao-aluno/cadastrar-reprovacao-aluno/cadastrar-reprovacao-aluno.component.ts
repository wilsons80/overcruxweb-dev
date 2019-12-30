import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/core/aluno';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { ReprovacaoAlunoService } from 'src/app/services/reprovacao-aluno/reprovacao-aluno.service';
import { ReprovacaoAluno } from 'src/app/core/reprovacao-aluno';
import * as _ from 'lodash';

@Component({
  selector: 'cadastrar-reprovacao-aluno',
  templateUrl: './cadastrar-reprovacao-aluno.component.html',
  styleUrls: ['./cadastrar-reprovacao-aluno.component.css']
})
export class CadastrarReprovacaoAlunoComponent implements OnInit {

  alunos: Aluno[];
  alunoSelecionado: Aluno = null;

  reprovacaoAluno: ReprovacaoAluno = new ReprovacaoAluno();

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
    private alunoService: AlunoService,
    private reprovacaoAlunoService: ReprovacaoAlunoService
  ) { }


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

    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.reprovacaoAlunoService.getById(id).subscribe((reprovacaoAluno: ReprovacaoAluno) => {
        this.reprovacaoAluno = reprovacaoAluno;
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
    this.reprovacaoAlunoService.cadastrar(this.reprovacaoAluno).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Reprovação do aluno cadastrada com sucesso');
    });
  }


  limpar() {
    this.reprovacaoAluno = new ReprovacaoAluno();
    this.reprovacaoAluno.aluno = new Aluno();

    this.alunoSelecionado = null;
  }

  cancelar() {
    this.location.back();
  }


  atualizar() {
    this.reprovacaoAlunoService.alterar(this.reprovacaoAluno).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Reprovação do aluno atualizada com sucesso');
    });
  }

  mostrarDadosAluno(idAluno) {
    this.reprovacaoAluno.aluno = _.find(this.alunos, (a: Aluno) => a.id === idAluno);
  }

}

