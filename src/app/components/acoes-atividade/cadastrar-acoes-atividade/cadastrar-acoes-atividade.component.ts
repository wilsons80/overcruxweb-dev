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

  carregarPerfil: CarregarPerfil;
  perfilAcesso: Acesso = new Acesso();
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;


  constructor(
    private acoesAtividadeService: AcoesAtividadeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.acoes.oficina = new Atividade();
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

    this.acoes.funcionarioAprovaAcao = new Funcionario();
    this.acoes.funcionarioExecutaAcao = new Funcionario();
    this.acoes.funcionarioPlanejamentoAcao = new Funcionario();


    const codigoacao = this.activatedRoute.snapshot.queryParams.codigoacao ? this.activatedRoute.snapshot.queryParams.codigoacao : null;
    if (codigoacao) {
      this.isAtualizar = true;
      this.acoesAtividadeService.getById(codigoacao).subscribe((acoes: Acoes) => {
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
      this.router.navigate(['acoesoficinas']);
      this.toastService.showSucesso('Ações atividade cadastrada com sucesso');
    });
  }



  limpar() {
    this.acoes = new Acoes();
  }

  cancelar() {
    this.router.navigate(['acoesoficinas']);
  }


  atualizar() {
    if (!this.validarDatas() ) { return; }

    if(this.acoes.materiaisAcao) {
      const temQuantidadeInvalida = this.acoes.materiaisAcao.find(m => !m.quantidadeMaterial || m.quantidadeMaterial === 0);
      if(temQuantidadeInvalida) {
        this.toastService.showSucesso('Existem materiais com quantidade não informada ou com valor zero(0)');
        return;
      }


      const materiaisTemp = this.acoes.materiaisAcao.map(m => m.material.nome);
      const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
      const jaExiste = findDuplicates(materiaisTemp);
      if(jaExiste && jaExiste.length) {
        this.toastService.showAlerta('Existem materiais duplicados na oficina.');
        return;
      }
    }

    this.acoesAtividadeService.alterar(this.acoes).subscribe(() => {
      this.router.navigate(['acoesoficinas']);
      this.toastService.showSucesso('Ações atividade atualizada com sucesso');
    });
  }



  validarDatas(): boolean {
    if (this.acoes.dataInicio && new Date(this.acoes.dataInicio).getTime() < new Date(this.acoes.oficina.dataInicio).getTime()) {
      this.toastService.showAlerta('A data de início informada não pode ser menor que a data de início da atividade selecionada.');
      return false;
    }

    if (this.acoes.oficina.dataFim) {
      if (this.acoes.dataInicio &&
        new Date(this.acoes.dataInicio).getTime() > new Date(this.acoes.oficina.dataFim).getTime()) {
        this.toastService.showAlerta('A data de início informada não pode ser menor que a data de início da atividade selecionada.');
        return false;
      }
    }

    if (this.acoes.oficina.dataFim &&
        this.acoes.dataFim &&
        new Date(this.acoes.dataFim).getTime() > new Date(this.acoes.oficina.dataFim).getTime()) {
      this.toastService.showAlerta('A data de fim informada não pode ser maior que a data de fim da atividade selecionada.');
      return false;
    }

    if (this.acoes.dataFim &&
        new Date(this.acoes.dataFim).getTime() < new Date(this.acoes.oficina.dataInicio).getTime()) {
      this.toastService.showAlerta('A data de fim informada não pode ser menor que a data de início da atividade selecionada.');
      return false;
    }

    return true;
  }


}
