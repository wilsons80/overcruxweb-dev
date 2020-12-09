import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Instituicao } from 'src/app/core/instituicao';
import { TiposAtividades } from 'src/app/core/tipos-atividades';
import { TiposAtividadesService } from 'src/app/services/tipos-atividades/tipos-atividades.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { InstituicaoService } from './../../../services/instituicao/instituicao.service';

@Component({
  selector: 'cadastrar-tipos-atividades',
  templateUrl: './cadastrar-tipos-atividades.component.html',
  styleUrls: ['./cadastrar-tipos-atividades.component.css']
})
export class CadastrarTiposAtividadesComponent implements OnInit {

  instituicoes: Instituicao[];

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;
  tiposAtividades: TiposAtividades;

  constructor(
    private instituicaoService: InstituicaoService,
    private tiposAtividadesService: TiposAtividadesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {

  }


  ngOnInit() {

    this.inicializarObjetos()

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    this.instituicaoService.getAll().subscribe((instituicoes: Instituicao[]) => {
      this.instituicoes = instituicoes;
    })

    let idTiposAtividades: number;
    idTiposAtividades = this.activatedRoute.snapshot.queryParams.idTiposAtividades ? this.activatedRoute.snapshot.queryParams.idTiposAtividades : null;
    if (idTiposAtividades) {
      this.isAtualizar = true;
      this.tiposAtividadesService.getById(idTiposAtividades).subscribe((tiposAtividade: TiposAtividades) => {
        this.tiposAtividades = tiposAtividade;
        if (!this.tiposAtividades.instituicao) {
          this.tiposAtividades.instituicao = new Instituicao();
        }
      });
    }

  }
  inicializarObjetos() {
    this.tiposAtividades = new TiposAtividades();
    this.tiposAtividades.instituicao = new Instituicao();
  }
  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.tiposAtividadesService.cadastrar(this.tiposAtividades).subscribe(() => {
      this.toastService.showSucesso("Tipo Atividade cadastrado com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['tiposatividades']);
  }

  atualizar() {
    this.tiposAtividadesService.alterar(this.tiposAtividades).subscribe(() => {
      this.toastService.showSucesso("Tipo Atividade atualizado com sucesso");
    });

  }

}
