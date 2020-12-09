import { Component, OnInit } from '@angular/core';
import { Atividade } from 'src/app/core/atividade';
import { Turmas } from 'src/app/core/turmas';
import { Acesso } from 'src/app/core/acesso';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { PlanosAcao } from 'src/app/core/planos-acao';
import { Projeto } from 'src/app/core/projeto';
import { Programa } from 'src/app/core/programa';
import { Unidade } from 'src/app/core/unidade';
import { TiposAtividades } from 'src/app/core/tipos-atividades';
import { TiposAtividadesService } from 'src/app/services/tipos-atividades/tipos-atividades.service';

@Component({
  selector: 'cadastrar-oficina',
  templateUrl: './cadastrar-oficina.component.html',
  styleUrls: ['./cadastrar-oficina.component.css']
})
export class CadastrarOficinaComponent implements OnInit {

  oficina: Atividade = new Atividade();


  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;
  tiposAtividades: TiposAtividades;

  constructor(
    private atividadeService: AtividadeService,
    private tiposAtividadesService: TiposAtividadesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService) { }


  ngOnInit() {
    this.limpar();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    this.tiposAtividadesService.getAll().subscribe((tiposAtividades: TiposAtividades) => {
      this.tiposAtividades = tiposAtividades;
    });

    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.atividadeService.getById(id).subscribe((oficina: Atividade) => {
        this.oficina = oficina;
      });
    }

  }


  mostrarBotaoLimpar() {
    if (this.isAtualizar) { return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }


  cadastrar() {

    this.atividadeService.cadastrar(this.oficina).subscribe(() => {
      this.router.navigate(['oficinas']);
      this.toastService.showSucesso('Oficina cadastrada com sucesso!');
    });
  }

  limpar() {
    this.oficina = new Atividade();
    this.oficina.projeto = new Projeto();
    this.oficina.programa = new Programa();
    this.oficina.unidade = new Unidade();
    this.oficina.tiposAtividades = new TiposAtividades();
  }

  cancelar() {
    this.router.navigate(['oficinas']);
  }


  atualizar() {

    this.atividadeService.alterar(this.oficina).subscribe(() => {
      this.router.navigate(['oficinas']);
      this.toastService.showSucesso('Oficina atualizada com sucesso.');
    });

  }


}
