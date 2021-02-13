import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { TiposDoadores } from 'src/app/core/tipos-doadores';
import { TiposDoadoresService } from 'src/app/services/tipos-doadores/tipos-doadores.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'cadastrar-tipos-doadores',
  templateUrl: './cadastrar-tipos-doadores.component.html',
  styleUrls: ['./cadastrar-tipos-doadores.component.css']
})
export class CadastrarTiposDoadoresComponent implements OnInit {


  tiposDoadores: TiposDoadores;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private tiposDoadoresService: TiposDoadoresService,
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
      this.tiposDoadoresService.getById(id).subscribe((tiposDoadores: TiposDoadores) => {
        this.tiposDoadores = tiposDoadores;

      });
    }

  }
  inicializarObjetos() {
    this.tiposDoadores = new TiposDoadores();
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.tiposDoadoresService.cadastrar(this.tiposDoadores).subscribe(() => {
      this.toastService.showSucesso("Cadastro realizado com sucesso");
      this.router.navigate(['tiposdoadores']);
    });
  }


  limpar() {
    this.inicializarObjetos();
    this.tiposDoadores.codigo = null;
    this.tiposDoadores.descricao = null;
  }

  cancelar() {
    this.router.navigate(['tiposdoadores']);
  }

  atualizar() {

    this.tiposDoadoresService.alterar(this.tiposDoadores).subscribe(() => {
      this.toastService.showSucesso("Registro atualizado com sucesso");
    });

  }

}
