import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from 'src/app/core/atendimento';
import { Diagnostico } from 'src/app/core/diagnostico';
import { Acesso } from 'src/app/core/acesso';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { AtendimentosService } from 'src/app/services/atendimentos/atendimentos.service';
import { DiagnosticoAtendimentoService } from 'src/app/services/diagnostico-atendimento/diagnostico-atendimento.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Aluno } from './../../../core/aluno';
import { Solucoes } from './../../../core/solucoes';
import { SolucaoService } from '../../../services/solucao/solucao.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-cadastrar-atendimento',
  templateUrl: './cadastrar-atendimento.component.html',
  styleUrls: ['./cadastrar-atendimento.component.css']
})
export class CadastrarAtendimentoComponent implements OnInit {

  diagnosticos: Diagnostico[];
  solucoes: Solucoes[];
  alunos: Aluno[];
  atendimento: Atendimento = new Atendimento();


  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  constructor(
    private atendimentoService: AtendimentosService,
    private solucaoAtendimentoService: SolucaoService,
    private diagnosticoAtendimentoService: DiagnosticoAtendimentoService,
    private alunoService: AlunoService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) {
  }


  ngOnInit() {

    this.atendimento.aluno = new Aluno();
    this.atendimento.diagnostico = new Diagnostico();
    this.atendimento.solucoes = new Solucoes();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }
    this.solucaoAtendimentoService.getAll().subscribe((solucoes: Solucoes[]) => {
      this.solucoes = solucoes;
    })

    this.diagnosticoAtendimentoService.getAll().subscribe((diagnosticos: Diagnostico[]) => {
      this.diagnosticos = diagnosticos;
    })

    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
    })

    let idAtendimento: number;
    idAtendimento = this.activatedRoute.snapshot.queryParams.idAtendimento ? this.activatedRoute.snapshot.queryParams.idAtendimento : null;
    if (idAtendimento) {
      this.isAtualizar = true;
      this.atendimentoService.getById(idAtendimento).subscribe((atendimento: Atendimento) => {
        this.atendimento = atendimento
      });
    }

  }
  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.atendimentoService.cadastrar(this.atendimento).subscribe(() => {
      this.router.navigate(['atendimento']);
      this.toastService.showSucesso("Atendimento cadastrado com sucesso");
    });
  }

  limpar() {
    this.atendimento = new Atendimento();
  }

  cancelar() {
    this.router.navigate(['atendimento']);
  }


  atualizar() {
    this.atendimentoService.alterar(this.atendimento).subscribe(() => {
      this.router.navigate(['atendimento']);
      this.toastService.showSucesso("Atendimento atualizado com sucesso");
    });

  }

  mostrarDadosAluno(idAluno:number) {
    this.atendimento.aluno = _.find(this.alunos, (a: Aluno) => a.id === idAluno);
  }

}
