import { Component, OnInit } from '@angular/core';
import { SituacoesVulnerabilidade } from 'src/app/core/situacoes-vulnerabilidade';
import { SituacaoVulnerabilidadeService } from 'src/app/services/situacao-vulnerabilidade/situacao-vulnerabilidade.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Location } from '@angular/common';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-cadastrar-situacao-vulnerabilidade',
  templateUrl: './cadastrar-situacao-vulnerabilidade.component.html',
  styleUrls: ['./cadastrar-situacao-vulnerabilidade.component.css']
})
export class CadastrarSituacaoVulnerabilidadeComponent implements OnInit {

  situacao: SituacoesVulnerabilidade = new SituacoesVulnerabilidade();
  isAtualizar = false;


  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();


  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private situacaoService: SituacaoVulnerabilidadeService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) { }


  ngOnInit() {

    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }
    let idSituacao: number;
    idSituacao = this.activatedRoute.snapshot.queryParams.idSituacao ? this.activatedRoute.snapshot.queryParams.idSituacao : null;
    if (idSituacao) {
      this.isAtualizar = true;
      this.situacaoService.getById(idSituacao).subscribe((situacao: SituacoesVulnerabilidade) => {
        this.situacao = situacao;
      });
    }
  }
  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }
  cadastrar() {
    this.situacaoService.cadastrar(this.situacao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Situação de Vulnerabilidade cadastrada com sucesso');
    });
  }

  limpar() {
    this.situacao = new SituacoesVulnerabilidade();
   }

  cancelar() {
    this.location.back();
  }


  atualizar() {
    this.situacaoService.alterar(this.situacao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Situação de Vulnerabilidade atualizada com sucesso');
    });
  }

}
