import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/core/atividade';
import { Acesso } from 'src/app/core/acesso';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Acoes } from './../../../core/acoes';
import { AcoesAtividadeService } from './../../../services/acoes-atividade/acoes-atividade.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-cadastrar-acoes-atividade',
  templateUrl: './cadastrar-acoes-atividade.component.html',
  styleUrls: ['./cadastrar-acoes-atividade.component.css']
})
export class CadastrarAcoesAtividadeComponent implements OnInit {

  acoes: Acoes = new Acoes();

  atividades: Atividade[];

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private acoesAtividadeService: AcoesAtividadeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private atividadeService: AtividadeService,
  ) {
    this.acoes.atividade = new Atividade();
  }


  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }
    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    })


    let idAcoesAtividade: number;
    idAcoesAtividade = this.activatedRoute.snapshot.queryParams.idAcoesAtividade ? this.activatedRoute.snapshot.queryParams.idAcoesAtividade : null;
    if (idAcoesAtividade) {
      this.isAtualizar = true;
      this.acoesAtividadeService.getById(idAcoesAtividade).subscribe((acoes: Acoes) => {
        this.acoes = acoes
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
    if (this.acoes.dataInicio.getTime() < new Date(this.acoes.atividade.dataInicio).getTime()) {
      this.toastService.showAlerta('A data de início informada não pode ser menor que a data de início da atividade selecionada.');
      return false;
    }

    if (this.acoes.atividade.dataFim) {
      if (this.acoes.dataInicio &&
        this.acoes.dataInicio.getTime() > new Date(this.acoes.atividade.dataFim).getTime()) {
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

}
