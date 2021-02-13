import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CondicoesMoradia } from 'src/app/core/condicoes-moradia';
import { CondicoesMoradiaService } from 'src/app/services/condicoes-moradia/condicoes-moradia.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'cadastrar-condicao-moradia',
  templateUrl: './cadastrar-condicao-moradia.component.html',
  styleUrls: ['./cadastrar-condicao-moradia.component.css']
})
export class CadastrarCondicaoMoradiaComponent implements OnInit {

  condicoesMoradia: CondicoesMoradia[];
  condicaoMoradia: CondicoesMoradia = new CondicoesMoradia();
  isAtualizar = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private condicaoMoradiaService: CondicoesMoradiaService,
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

    this.condicaoMoradiaService.getAll().subscribe((condicoesMoradia: CondicoesMoradia[]) => {
      this.condicoesMoradia = condicoesMoradia;
    });

    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.condicaoMoradiaService.getById(id).subscribe((condicaoMoradia: CondicoesMoradia) => {
        this.condicaoMoradia = condicaoMoradia;
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
    this.condicaoMoradiaService.cadastrar(this.condicaoMoradia).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Condição de moradia cadastrada com sucesso');
    });
  }

  limpar() {
    this.condicaoMoradia = new CondicoesMoradia();
  }

  cancelar() {
    this.location.back();
  }


  atualizar() {
    this.condicaoMoradiaService.alterar(this.condicaoMoradia).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Condição de moradia atualizada com sucesso');
    });
  }

}
