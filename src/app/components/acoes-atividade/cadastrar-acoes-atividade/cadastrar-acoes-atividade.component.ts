import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/core/atividade';
import { Acesso } from 'src/app/core/acesso';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Acoes } from './../../../core/acoes';
import { AcoesAtividadeService } from './../../../services/acoes-atividade/acoes-atividade.service';
import * as _ from 'lodash';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { Funcionario } from 'src/app/core/funcionario';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-cadastrar-acoes-atividade',
  templateUrl: './cadastrar-acoes-atividade.component.html',
  styleUrls: ['./cadastrar-acoes-atividade.component.css']
})
export class CadastrarAcoesAtividadeComponent implements OnInit {

  acoes: Acoes = new Acoes();

  atividades: Atividade[];
  funcionarios: Funcionario[];

  carregarPerfil: CarregarPerfil;
  perfilAcesso: Acesso = new Acesso();
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;


  constructor(
    private acoesAtividadeService: AcoesAtividadeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private atividadeService: AtividadeService,
    private funcionarioService: FuncionarioService
  ) {
    this.acoes.atividade = new Atividade();
    this.carregarPerfil = new CarregarPerfil();
  }


  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }
    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    })

    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    });

    this.acoes.funcionarioAprovaAcao = new Funcionario();
    this.acoes.funcionarioExecutaAcao = new Funcionario();
    this.acoes.funcionarioPlanejamentoAcao = new Funcionario();


    const idAcoesAtividade = this.activatedRoute.snapshot.queryParams.idAcoesAtividade ? this.activatedRoute.snapshot.queryParams.idAcoesAtividade : null;
    if (idAcoesAtividade) {
      this.isAtualizar = true;
      this.acoesAtividadeService.getById(idAcoesAtividade).subscribe((acoes: Acoes) => {
        this.acoes = acoes;
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
    if (!this.validarDatas() ) { return; }

    this.acoesAtividadeService.cadastrar(this.acoes).subscribe(() => {
      this.router.navigate(['acoesatividade'])
      this.toastService.showSucesso("Ações atividade cadastrada com sucesso");
    });
  }

  validarDatas(): boolean {
    if (this.acoes.dataInicio && new Date(this.acoes.dataInicio).getTime() < new Date(this.acoes.atividade.dataInicio).getTime()) {
      this.toastService.showAlerta('A data de início informada não pode ser menor que a data de início da atividade selecionada.');
      return false;
    }

    if (this.acoes.atividade.dataFim) {
      if (this.acoes.dataInicio &&
        new Date(this.acoes.dataInicio).getTime() > new Date(this.acoes.atividade.dataFim).getTime()) {
        this.toastService.showAlerta('A data de início informada não pode ser menor que a data de início da atividade selecionada.');
        return false;
      }
    }

    if (this.acoes.atividade.dataFim &&
        this.acoes.dataFim &&
        new Date(this.acoes.dataFim).getTime() > new Date(this.acoes.atividade.dataFim).getTime()) {
      this.toastService.showAlerta('A data de fim informada não pode ser maior que a data de fim da atividade selecionada.');
      return false;
    }

    if (this.acoes.dataFim &&
        new Date(this.acoes.dataFim).getTime() < new Date(this.acoes.atividade.dataInicio).getTime()) {
      this.toastService.showAlerta('A data de fim informada não pode ser menor que a data de início da atividade selecionada.');
      return false;
    }

    return true;
  }

  limpar() {
    this.acoes = new Acoes();
  }

  cancelar() {
    this.router.navigate(['acoesatividade'])
  }


  atualizar() {
    if (!this.validarDatas() ) { return; }

    this.acoesAtividadeService.alterar(this.acoes).subscribe(() => {
      this.router.navigate(['acoesatividade'])
      this.toastService.showSucesso("Ações atividade atualizada com sucesso");
    });

  }

  getNomeAtividade(){
    if(this.atividades)
    return this.atividades.length === 0 ? 'Nenhuma atividade cadastrada' : 'Atividade'
  }

  mostrarDadosAtividade(idAtividade) {
    this.acoes.atividade = _.cloneDeep(_.find(this.atividades, (a: Atividade) => a.id === idAtividade));
  }


  carregarDadosFuncionarioAprovacao() {
    if (this.acoes.funcionarioAprovaAcao.id) {
      this.acoes.funcionarioAprovaAcao = _.cloneDeep(_.find(this.funcionarios,  (f: Funcionario) => f.id === this.acoes.funcionarioAprovaAcao.id));
    }
  }

  carregarDadosFuncionarioExecucao() {
    if (this.acoes.funcionarioExecutaAcao.id) {
      this.acoes.funcionarioExecutaAcao = _.cloneDeep(_.find(this.funcionarios,  (f: Funcionario) => f.id === this.acoes.funcionarioExecutaAcao.id));
    }
  }
  carregarDadosFuncionarioPlanejamento() {
    if (this.acoes.funcionarioPlanejamentoAcao.id) {
      this.acoes.funcionarioPlanejamentoAcao = _.cloneDeep(_.find(this.funcionarios,  (f: Funcionario) => f.id === this.acoes.funcionarioPlanejamentoAcao.id));
    }
  }

}
