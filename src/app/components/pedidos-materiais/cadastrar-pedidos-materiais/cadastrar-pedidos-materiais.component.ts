import { ItensPedidosMateriais } from './../../../core/itens-pedidos-materiais';
import { Component, OnInit } from '@angular/core';
import { PedidosMateriais } from 'src/app/core/pedidos-materiais';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PedidosMateriaisService } from 'src/app/services/pedidosMateriais/pedidos-materiais.service';
import { Unidade } from 'src/app/core/unidade';
import { Empresa } from 'src/app/core/empresa';
import { Departamento } from 'src/app/core/departamento';
import { Programa } from 'src/app/core/programa';
import { Projeto } from 'src/app/core/projeto';
import { Funcionario } from 'src/app/core/funcionario';
import { FilterMovimentacoes } from 'src/app/core/filter-movimentacoes';
import { ComboProjeto } from 'src/app/core/combo-projeto';
import { ComboPrograma } from 'src/app/core/combo-programa';

@Component({
  selector: 'cadastrar-pedidos-materiais',
  templateUrl: './cadastrar-pedidos-materiais.component.html',
  styleUrls: ['./cadastrar-pedidos-materiais.component.css']
})
export class CadastrarPedidosMateriaisComponent implements OnInit {

  pedidosMateriais: PedidosMateriais;

  isAtualizar: boolean = false;
  filtro: FilterMovimentacoes;
  
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private pedidosMateriaisService:PedidosMateriaisService
  ) { }

  ngOnInit() {
    this.inicializarObjetos();
   
    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;      
      this.pedidosMateriaisService.getById(id).subscribe((pedidosMateriais: PedidosMateriais) => {
        this.pedidosMateriais = pedidosMateriais;

        if(!this.pedidosMateriais.programa) {
          this.pedidosMateriais.programa = new Programa();
        }
        if(!this.pedidosMateriais.projeto) {
          this.pedidosMateriais.projeto = new Projeto();
        }

        this.filtro.programa.id = this.pedidosMateriais.programa.id;
        this.filtro.projeto.id  = this.pedidosMateriais.projeto.id;
      });
    }

  }

  cadastrar() {
    this.pedidosMateriaisService.cadastrar(this.pedidosMateriais).subscribe(() => {
      this.router.navigate(['pedidosmateriais']);
      this.toastService.showSucesso("Pedido Material cadastrado com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['pedidosmateriais']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }


  atualizar() {
    this.pedidosMateriaisService.alterar(this.pedidosMateriais).subscribe(() => {
      this.router.navigate(['pedidosmateriais']);
      this.toastService.showSucesso("Pedido Material atualizado com sucesso");
    });

  }

  inicializarObjetos() {
    this.pedidosMateriais = new PedidosMateriais();
    this.pedidosMateriais.unidade = new Unidade();
    this.pedidosMateriais.departamento = new Departamento();
    this.pedidosMateriais.programa = new Programa();
    this.pedidosMateriais.projeto = new Projeto();
    this.pedidosMateriais.funcionarioPedido = new Funcionario();
    this.pedidosMateriais.funcionarioRecPed = new Funcionario();
    this.pedidosMateriais.itensPedidosMateriais = [];

    this.filtro = new FilterMovimentacoes();
    this.filtro.projeto = new ComboProjeto();
    this.filtro.programa = new ComboPrograma();

  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }
}
