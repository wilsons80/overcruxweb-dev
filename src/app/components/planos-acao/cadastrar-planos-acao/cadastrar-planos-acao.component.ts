import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iniciativa } from 'src/app/core/iniciativa';
import { PlanosAcaoService } from 'src/app/services/planosAcao/planos-acao.service';
import { PlanosAcao } from './../../../core/planos-acao';
import { IniciativaService } from './../../../services/iniciativa/iniciativa.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-cadastrar-planos-acao',
  templateUrl: './cadastrar-planos-acao.component.html',
  styleUrls: ['./cadastrar-planos-acao.component.css']
})
export class CadastrarPlanosAcaoComponent implements OnInit {

  iniciativas: Iniciativa[];
  planosAcao: PlanosAcao;

  isAtualizar: boolean = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private iniciativaService: IniciativaService,
    private planosAcaoService: PlanosAcaoService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private toastService:ToastService
  ) {
  }


  ngOnInit() {

    this.inicializarObjetos();

    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }
    this.iniciativaService.getAll().subscribe((iniciativas: Iniciativa[]) => {
      this.iniciativas = iniciativas;
    })

    let idPlanosAcao: number;
    idPlanosAcao = this.activatedRoute.snapshot.queryParams.idPlanosAcao ? this.activatedRoute.snapshot.queryParams.idPlanosAcao : null;
    if (idPlanosAcao) {
      this.isAtualizar = true;
      this.planosAcaoService.getById(idPlanosAcao).subscribe((planosAcao: PlanosAcao) => {
        this.planosAcao = planosAcao
      });
    }

  }
  inicializarObjetos() {
    this.planosAcao = new PlanosAcao();
    this.planosAcao.iniciativa = new Iniciativa();
  }

  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }
  
  cadastrar() {
    this.planosAcaoService.cadastrar(this.planosAcao).subscribe(() => {
      this.router.navigate(['planosacao']);
      this.toastService.showSucesso("Plano de ação cadastrado com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['planosacao']);
  }


  atualizar() {
    this.planosAcaoService.alterar(this.planosAcao).subscribe(() => {
      this.router.navigate(['planosacao']);
      this.toastService.showSucesso("Plano de ação atualizado com sucesso");
    });

  }

}
