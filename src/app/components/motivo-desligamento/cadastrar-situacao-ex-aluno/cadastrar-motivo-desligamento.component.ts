import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { MotivoDesligamento } from 'src/app/core/motivo-desligamento';
import { MotivoDesligamentoService } from 'src/app/services/motivo-desligamento/motivo-desligamento.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'cadastrar-situacao-ex-aluno',
  templateUrl: './cadastrar-motivo-desligamento.component.html',
  styleUrls: ['./cadastrar-motivo-desligamento.component.css']
})
export class CadastrarMotivoDesligamentoComponent implements OnInit {


  motivoDesligamento: MotivoDesligamento;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private motivoDesligamentoService: MotivoDesligamentoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
  ) {

  }


  ngOnInit() {

    this.inicializarObjetos()

    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.motivoDesligamentoService.getById(id).subscribe((motivoDesligamento: MotivoDesligamento) => {
        this.motivoDesligamento = motivoDesligamento;

      });
    }

  }
  inicializarObjetos() {
    this.motivoDesligamento = new MotivoDesligamento();
    this.motivoDesligamento.motivoDesligamento = null;
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.motivoDesligamentoService.cadastrar(this.motivoDesligamento).subscribe(() => {
      this.toastService.showSucesso("Motivo desligamento cadastrado com sucesso");
      this.router.navigate(['motivosdesligamentos']);
    });
  }


  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['motivosdesligamentos']);
  }

  atualizar() {

    this.motivoDesligamentoService.alterar(this.motivoDesligamento).subscribe(() => {
      this.toastService.showSucesso("Motivo desligamento atualizado com sucesso");
    });

  }

}
