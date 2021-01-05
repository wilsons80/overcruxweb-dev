import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { TiposPublicoPrioritario } from 'src/app/core/tipos-publico-prioritario';
import { TiposPublicoPrioritarioService } from 'src/app/services/tipos-publico-prioritario/tipos-publico-prioritario.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'cadastrar-situacao-ex-aluno',
  templateUrl: './cadastrar-tipos-publico-prioritario.component.html',
  styleUrls: ['./cadastrar-tipos-publico-prioritario.component.css']
})
export class CadastrarTiposPublicoPrioritarioComponent implements OnInit {


  tiposPublicoPrioritario: TiposPublicoPrioritario;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private tiposPublicoPrioritarioService: TiposPublicoPrioritarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
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

    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.tiposPublicoPrioritarioService.getById(id).subscribe((tiposPublicoPrioritario: TiposPublicoPrioritario) => {
        this.tiposPublicoPrioritario = tiposPublicoPrioritario;

      });
    }

  }
  inicializarObjetos() {
    this.tiposPublicoPrioritario = new TiposPublicoPrioritario();
    this.tiposPublicoPrioritario.descricao = null;
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.tiposPublicoPrioritarioService.cadastrar(this.tiposPublicoPrioritario).subscribe(() => {
      this.toastService.showSucesso("Cadastrado realizado com sucesso");
      this.router.navigate(['tipospublicoprioritario']);
    });
  }


  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['tipospublicoprioritario']);
  }

  atualizar() {

    this.tiposPublicoPrioritarioService.alterar(this.tiposPublicoPrioritario).subscribe(() => {
      this.toastService.showSucesso("Atualização feita com sucesso");
    });

  }

}
