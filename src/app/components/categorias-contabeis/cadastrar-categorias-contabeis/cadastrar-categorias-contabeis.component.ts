import { PlanosContas } from '../../../core/planos-contas';
import { CategoriasContabeis } from './../../../core/categorias-contabeis';
import { Component, OnInit } from '@angular/core';
import { Acesso } from 'src/app/core/acesso';
import { CategoriasContabeisService } from 'src/app/services/categorias-contabeis/categorias-contabeis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TipoDespesa } from 'src/app/core/tipo-despesa';


@Component({
  selector: 'cadastrar-categorias-contabeis',
  templateUrl: './cadastrar-categorias-contabeis.component.html',
  styleUrls: ['./cadastrar-categorias-contabeis.component.css']
})
export class CadastrarCategoriasContabeisComponent implements OnInit {

  listaPlanosContas: any[];
  categoriasContabeis: CategoriasContabeis;

  isAtualizar = false;
  tiposDespesas: TipoDespesa = new TipoDespesa();
  perfilAcesso: Acesso;

  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  constructor(
    private categoriasContabeisService: CategoriasContabeisService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.inicializarObjetos();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    /*
    this.categoriasContabeisService.getAllCombo().subscribe((listaPlanosContas: PlanosContas[]) => {
      this.listaCategoriasContabeis = listaPlanosContas;
    })
    */

    this.categoriasContabeisService.getAllView(true).subscribe((retorno: PlanosContas[]) => {
      this.listaPlanosContas = retorno;
    })
   
    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.categoriasContabeisService.getById(id).subscribe((categoriasContabeis: CategoriasContabeis) => {
        this.categoriasContabeis = categoriasContabeis;
      });
    }

  }

  cadastrar() {
    this.categoriasContabeisService.cadastrar(this.categoriasContabeis).subscribe(() => {
      this.router.navigate(['planoscontascontabeis']);
      this.toastService.showSucesso('Plano de conta cadastrado com sucesso');
    });
  }

  limpar() {
    this.inicializarObjetos();
    this.categoriasContabeis.nome = '';
    this.categoriasContabeis.tipo = '';
    this.categoriasContabeis.descricaoCategoria = '';
  }

  cancelar() {
    this.router.navigate(['planoscontascontabeis']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }


  atualizar() {
    this.categoriasContabeisService.alterar(this.categoriasContabeis).subscribe(() => {
      this.router.navigate(['planoscontascontabeis']);
      this.toastService.showSucesso('Plano de conta atualizado com sucesso.');
    });

  }


  inicializarObjetos() {
    this.categoriasContabeis = new CategoriasContabeis();
    this.categoriasContabeis.categoriaSuperior = new CategoriasContabeis();
    
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

}
