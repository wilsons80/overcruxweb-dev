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
  }


}

