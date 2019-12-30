import { Component, OnInit } from '@angular/core';
import { Avaliacao } from 'src/app/core/avaliacao';
import { AvaliacaoAtividadeService } from 'src/app/services/avaliacao-atividade/avaliacao-atividade.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'app-cadastrar-avaliacao-atividade',
  templateUrl: './cadastrar-avaliacao-atividade.component.html',
  styleUrls: ['./cadastrar-avaliacao-atividade.component.css']
})
export class CadastrarAvaliacaoAtividadeComponent implements OnInit {

  avaliacao: Avaliacao = new Avaliacao();
  isAtualizar = false;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  constructor(
    private avaliacaoService: AvaliacaoAtividadeService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) {
  }


  ngOnInit() {
    let id: number;
    id = this.route.snapshot.queryParams.id ? this.route.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.avaliacaoService.getById(id).subscribe((avaliacao: Avaliacao) => {
        this.avaliacao = avaliacao;
      });
    }

  }
  cadastrar() {
    this.avaliacaoService.cadastrar(this.avaliacao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Avaliação cadastrada com sucesso");
    });
  }

  limpar() {
    this.avaliacao = new Avaliacao();
  }

  cancelar() {
    this.location.back();
  }


  atualizar() {
    this.avaliacaoService.alterar(this.avaliacao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Avaliação atualizada com sucesso");
    });
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) { return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }
}
