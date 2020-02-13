import { SaldosContasBancaria } from './../../../core/saldos-contas-bancaria';
import { Component, OnInit } from '@angular/core';
import { InformacoesBanco } from 'src/app/core/informacoes-banco';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { Acesso } from 'src/app/core/acesso';
import { ContasBancariaService } from 'src/app/services/contas-bancaria/contas-bancaria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { InstituicaoService } from 'src/app/services/instituicao/instituicao.service';
import { Unidade } from 'src/app/core/unidade';
import { Instituicao } from 'src/app/core/instituicao';

@Component({
  selector: 'cadastrar-contas-bancarias',
  templateUrl: './cadastrar-contas-bancarias.component.html',
  styleUrls: ['./cadastrar-contas-bancarias.component.css']
})
export class CadastrarContasBancariasComponent implements OnInit {

  listaBancos:InformacoesBanco[] = [
    {numero:"001", nome:"Banco do Brasil"},
    {numero:"070", nome:"Banco de Brasília"}
  ];
  
  saldos:any =[]

  tipoContas = [
    {id:"C", nome:"Conta Corrente"},
    {id:"P", nome:"Poupança"}
  ];

  unidades:Unidade[];

  contaBancaria: ContasBancaria;

  isAtualizar: boolean = false;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private contasBancariaService: ContasBancariaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private unidadeService:UnidadeService,

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

    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: Unidade[]) => {
      this.unidades = unidades;
    })
   
   
    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.contasBancariaService.getById(id).subscribe((contaBancaria: ContasBancaria) => {
        this.contaBancaria = contaBancaria
      });
    }

  }

  cadastrar() {
    this.contasBancariaService.cadastrar(this.contaBancaria).subscribe(() => {
      this.router.navigate(['contasBancaria']);
      this.toastService.showSucesso("Conta bancária cadastrada com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['contasBancaria']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }


  atualizar() {
    this.contasBancariaService.alterar(this.contaBancaria).subscribe(() => {
      this.router.navigate(['contasBancaria']);
      this.toastService.showSucesso("Conta bancária atualizada com sucesso");
    });

  }


  inicializarObjetos() {
    this.contaBancaria = new ContasBancaria();
    this.contaBancaria.saldosContasBancaria = new SaldosContasBancaria();
    this.contaBancaria.unidade = new Unidade();
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }


}
