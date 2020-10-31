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
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { FilterAlunos } from 'src/app/core/filter-alunos';
import { ComboAluno } from 'src/app/core/combo-aluno';

@Component({
  selector: 'app-cadastrar-atendimento',
  templateUrl: './cadastrar-atendimento.component.html',
  styleUrls: ['./cadastrar-atendimento.component.css']
})
export class CadastrarAtendimentoComponent implements OnInit {
  
  alunoCombo: ComboAluno;

  diagnosticos: Diagnostico[];
  solucoes: Solucoes[];
  alunos: Aluno[];
  atendimento: Atendimento = new Atendimento();


  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;
  
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
    this.carregarPerfil = new CarregarPerfil();
  }


  ngOnInit() {

    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.atendimento.aluno = new Aluno();
    this.atendimento.diagnostico = new Diagnostico();
    this.atendimento.solucoes = new Solucoes();
    this.alunoCombo = new ComboAluno();

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

    const idAtendimento = this.activatedRoute.snapshot.queryParams.idAtendimento ? this.activatedRoute.snapshot.queryParams.idAtendimento : null;
    if (idAtendimento) {
      this.isAtualizar = true;
      this.atendimentoService.getById(idAtendimento).subscribe((atendimento: Atendimento) => {
        this.atendimento = atendimento;
        this.alunoCombo.id = this.atendimento.aluno.id;
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
    this.alunoCombo = new ComboAluno();
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
    this.alunoService.getById(idAluno).subscribe((aluno: Aluno) => {
      this.atendimento.aluno = aluno;  
    })
  }


  onValorChange(registro: any) {
    this.atendimento.aluno.id = registro.id;

    if(this.atendimento.aluno){
      this.mostrarDadosAluno(this.atendimento.aluno.id);
    } else {
      this.atendimento.aluno = null;
    }
  }


}
