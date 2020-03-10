import { CarregarPerfil } from './../../../core/carregar-perfil';
import { Banco } from './../../../core/banco';
import { ListaBancosService } from './../../../services/listaBancos/lista-bancos.service';
import { Component, OnInit } from '@angular/core';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { Acesso } from 'src/app/core/acesso';
import { ContasBancariaService } from 'src/app/services/contas-bancaria/contas-bancaria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { Unidade } from 'src/app/core/unidade';
import * as _ from 'lodash';

@Component({
  selector: 'cadastrar-contas-bancarias',
  templateUrl: './cadastrar-contas-bancarias.component.html',
  styleUrls: ['./cadastrar-contas-bancarias.component.css']
})
export class CadastrarContasBancariasComponent implements OnInit {

  saldos: any = [];

  tipoContas = [
    {id: 'C', nome: 'Conta Corrente'},
    {id: 'P', nome: 'Poupança'},
    {id: 'A', nome: 'Aplicação'},
  ];

  public maskCelular = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  unidades: Unidade[];
  contasAssociadas: ContasBancaria[];

  contaBancaria: ContasBancaria;

  isAtualizar = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  listaBancos: Banco[];

  constructor(
    private contasBancariaService: ContasBancariaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private unidadeService: UnidadeService,
    private listaBancosService: ListaBancosService

  ) { 
    this.carregarPerfil = new CarregarPerfil();
  }

  ngOnInit() {
    this.inicializarObjetos();

    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    this.listaBancos = this.listaBancosService.listaBancos;


    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: Unidade[]) => {
      this.unidades = unidades;
    });


    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.contasBancariaService.getById(id).subscribe((contaBancaria: ContasBancaria) => {
        this.contaBancaria = contaBancaria;
        this.contaBancaria.banco = _.find(this.listaBancos, (b: Banco) => b.numero === this.contaBancaria.banco.numero);

        // Carrega apenas para contas do tipo APLICACAO e POUPANCA
        if (this.contaBancaria.tipoContaBancaria !== 'C') {
          this.carregarListaContasAssociadas();
        }
      });

    } else {
      this.carregarListaContasAssociadas();
    }

  }

  carregarListaContasAssociadas() {
    this.contasBancariaService.getAllComboByInstituicaoLogada()
    .subscribe((contasBancarias: ContasBancaria[]) => {
       this.contasAssociadas = contasBancarias.filter(c => c.tipoContaBancaria === 'C');
    });
  }

  cadastrar() {
    this.tratarDados();
    this.contasBancariaService.cadastrar(this.contaBancaria).subscribe(() => {
      this.router.navigate(['contasbancarias']);
      this.toastService.showSucesso('Conta bancária cadastrada com sucesso');
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['contasbancarias']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }


  atualizar() {
    this.tratarDados();
    this.contasBancariaService.alterar(this.contaBancaria).subscribe(() => {
      this.router.navigate(['contasbancarias']);
      this.toastService.showSucesso('Conta bancária atualizada com sucesso');
    });

  }


  inicializarObjetos() {
    this.contaBancaria = new ContasBancaria();
    this.contaBancaria.unidade = new Unidade();
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  tratarDados() {
    this.contaBancaria.telefoneTitular = this.contaBancaria.telefoneTitular ? this.retiraMascara(this.contaBancaria.telefoneTitular) : null
  }

  retiraMascara(objeto:any) {
    return objeto.replace(/\D/g, '');
  }


  carregarContaAssociada() {
    if (this.contaBancaria.contaAssociada) {
      const conta = _.cloneDeep(_.find(this.contasAssociadas,  (c: ContasBancaria) => c.id === this.contaBancaria.id));
      this.contaBancaria.contaAssociada = conta ? conta.id : null;
    }
  }

}