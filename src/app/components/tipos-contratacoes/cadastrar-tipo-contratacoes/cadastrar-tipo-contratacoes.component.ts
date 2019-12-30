import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TiposContratacoes } from './../../../core/tipos-contratacoes';
import { TiposContratacoesService } from './../../../services/tipos-contratacoes/tipos-contratacoes.service';

@Component({
  selector: 'cadastrar-tipo-contratacoes',
  templateUrl: './cadastrar-tipo-contratacoes.component.html',
  styleUrls: ['./cadastrar-tipo-contratacoes.component.css']
})
export class CadastrarTipoContratacoesComponent implements OnInit {

  tiposContratacoes: TiposContratacoes = new TiposContratacoes();

  isAtualizar: boolean = false;


  perfilAcesso: Acesso;

  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;


  constructor(
    private tiposContratacoesService: TiposContratacoesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
  }


  ngOnInit() {

    this.inicializarObjetos();

    
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    let idTiposContratacoes: number;
    idTiposContratacoes = this.activatedRoute.snapshot.queryParams.idTiposContratacoes ? this.activatedRoute.snapshot.queryParams.idTiposContratacoes : null;
    if (idTiposContratacoes) {
      this.isAtualizar = true;
      this.tiposContratacoesService.getById(idTiposContratacoes).subscribe((tiposContratacoes: TiposContratacoes) => {
        this.tiposContratacoes = tiposContratacoes
      });
    }

  }
  inicializarObjetos() {
    this.tiposContratacoes = new TiposContratacoes();
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.tiposContratacoesService.cadastrar(this.tiposContratacoes).subscribe(() => {
      this.router.navigate(['tiposcontratacoes']);
      this.toastService.showSucesso("Tipo contratação cadastrado com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['tiposcontratacoes']);
  }


  atualizar() {
    this.tiposContratacoesService.alterar(this.tiposContratacoes).subscribe(() => {
      this.router.navigate(['tiposcontratacoes']);
      this.toastService.showSucesso("Tipo contratação atualizado com sucesso");
    });

  }

}
