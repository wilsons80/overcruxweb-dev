import { Component, OnInit } from '@angular/core';
import { Solucoes } from 'src/app/core/solucoes';
import { SolucaoService } from 'src/app/services/solucao/solucao.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-cadastrar-solucao-atendimento',
  templateUrl: './cadastrar-solucao-atendimento.component.html',
  styleUrls: ['./cadastrar-solucao-atendimento.component.css']
})
export class CadastrarSolucaoAtendimentoComponent implements OnInit {

  solucao: Solucoes = new Solucoes();
  isAtualizar = false;


  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  constructor(
    private solucaoService: SolucaoService,
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
    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.solucaoService.getById(id).subscribe((retorno: Solucoes) => {
        this.solucao = retorno;
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
    this.solucaoService.cadastrar(this.solucao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Solução de atendimento cadastrada com sucesso');
    });
  }

  limpar() {
    this.solucao = new Solucoes();
   }

  cancelar() {
    this.location.back();
  }


  atualizar() {
    this.solucaoService.alterar(this.solucao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Solução de atendimento atualizada com sucesso');
    });
  }
}
