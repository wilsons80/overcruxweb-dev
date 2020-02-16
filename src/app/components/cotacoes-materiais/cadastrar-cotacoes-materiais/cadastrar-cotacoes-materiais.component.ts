import { CotacoesMateriaisService } from './../../../services/cotacoes-materiais/cotacoes-materiais.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Material } from 'src/app/core/material';
import { MaterialService } from 'src/app/services/material/material.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CotacoesMateriais } from './../../../core/cotacoes-materiais';
import { Empresa } from './../../../core/empresa';
import { Pedido } from './../../../core/pedido';
import { EmpresaService } from './../../../services/empresa/empresa.service';
import { PedidoService } from './../../../services/pedido/pedido.service';

@Component({
  selector: 'cadastrar-cotacoes-materiais',
  templateUrl: './cadastrar-cotacoes-materiais.component.html',
  styleUrls: ['./cadastrar-cotacoes-materiais.component.css']
})
export class CadastrarCotacoesMateriaisComponent implements OnInit {

  empresas: Empresa[];
  materiais: Material[];
  pedidos: Pedido[]

  cotacoesMaterial: CotacoesMateriais;

  isAtualizar: boolean = false;

  perfilAcesso: Acesso;


  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private cotacoesMateriaisService: CotacoesMateriaisService,
    private empresaService: EmpresaService,
    private materialService: MaterialService,
    private pedidoService: PedidoService,
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

    this.empresaService.getAll().subscribe((empresas: Empresa[]) => {
      this.empresas = empresas;
    })

    this.materialService.getAll().subscribe((materiais: Material[]) => {
      this.materiais = materiais;
    })

    this.pedidoService.getAll().subscribe((pedidos: Pedido[]) => {
      this.pedidos = pedidos;
    })


    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.cotacoesMateriaisService.getById(id).subscribe((cotacao: CotacoesMateriais) => {
        this.cotacoesMaterial = cotacao;
      });
    }

  }

  cadastrar() {
    this.cotacoesMateriaisService.cadastrar(this.cotacoesMaterial).subscribe(() => {
      this.router.navigate(['cotacoesmaterial']);
      this.toastService.showSucesso("Cotação cadastrada com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();

  }

  cancelar() {
    this.router.navigate(['cotacoesmaterial']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }


  atualizar() {
    this.cotacoesMateriaisService.alterar(this.cotacoesMaterial).subscribe(() => {
      this.router.navigate(['cotacoesmaterial']);
      this.toastService.showSucesso("Cotação atualizada com sucesso");
    });

  }


  inicializarObjetos() {
    this.cotacoesMaterial = new CotacoesMateriais();
    this.cotacoesMaterial.pedido = new Pedido();
    this.cotacoesMaterial.material = new Material();
    this.cotacoesMaterial.empresa = new Empresa();
    this.cotacoesMaterial.valorTotalCotacao = 0;
    this.cotacoesMaterial.valorUnitarioCotacao = 0;
    this.cotacoesMaterial.quantidadeMaterial = 0;
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  multiplicar(event) {
    this.cotacoesMaterial.valorUnitarioCotacao = event;
    this.cotacoesMaterial.valorTotalCotacao = this.cotacoesMaterial.valorUnitarioCotacao
      * this.cotacoesMaterial.quantidadeMaterial;
  }

  multiplicarComQuantidade() {
    this.cotacoesMaterial.valorTotalCotacao = this.cotacoesMaterial.valorUnitarioCotacao
      * this.cotacoesMaterial.quantidadeMaterial;
  }



}



