import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iniciativa } from 'src/app/core/iniciativa';
import { Metas } from 'src/app/core/metas';
import { Acesso } from 'src/app/core/acesso';
import { IniciativaService } from 'src/app/services/iniciativa/iniciativa.service';
import { MetasService } from 'src/app/services/metas/metas.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-cadastrar-iniciativas',
  templateUrl: './cadastrar-iniciativas.component.html',
  styleUrls: ['./cadastrar-iniciativas.component.css']
})
export class CadastrarIniciativasComponent implements OnInit {

  metas: Metas[];
  iniciativa: Iniciativa;

  isAtualizar: boolean = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;


  constructor(
    private iniciativaService: IniciativaService,
    private metasService: MetasService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) { }


  ngOnInit() {

    this.inicializarObjetos();

    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }


    this.metasService.getAll().subscribe((metas: Metas[]) => {
      this.metas = metas;
    })

    let idIniciativa: number;
    idIniciativa = this.activatedRoute.snapshot.queryParams.idIniciativa ? this.activatedRoute.snapshot.queryParams.idIniciativa : null;
    if (idIniciativa) {
      this.isAtualizar = true;
      this.iniciativaService.getById(idIniciativa).subscribe((iniciativa: Iniciativa) => {
        this.iniciativa = iniciativa
      });
    }

  }
  inicializarObjetos() {
    this.iniciativa = new Iniciativa();
    this.iniciativa.metas = new Metas();
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.iniciativaService.cadastrar(this.iniciativa).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Iniciativa cadastrada com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.location.back();
  }

 

  atualizar() {
    this.iniciativaService.alterar(this.iniciativa).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Iniciativa cadastrada com sucesso");
    });

  }
}
