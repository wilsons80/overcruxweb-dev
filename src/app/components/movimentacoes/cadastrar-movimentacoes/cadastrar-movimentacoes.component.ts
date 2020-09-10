import { AutenticadorService } from './../../../services/autenticador/autenticador.service';
import { MovimentacoesService } from './../../../services/movimentacoes/movimentacoes.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Movimentacoes } from 'src/app/core/movimentacoes';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Unidade } from 'src/app/core/unidade';
import { Empresa } from 'src/app/core/empresa';
import { Departamento } from 'src/app/core/departamento';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { Banco } from 'src/app/core/banco';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { Doadores } from 'src/app/core/doadores';
import { BroadcastEventService } from 'src/app/services/broadcast-event/broadcast-event.service';
import { PagamentosFatura } from 'src/app/core/pagamentos-fatura';

@Component({
  selector: 'cadastrar-movimentacoes',
  templateUrl: './cadastrar-movimentacoes.component.html',
  styleUrls: ['./cadastrar-movimentacoes.component.css']
})
export class CadastrarMovimentacoesComponent implements OnInit {

  movimentacoes: Movimentacoes;

  isAtualizar = false;  
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;
  isContasReembolsoInvalidas = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  contasBancariasReembolso: ContasBancaria[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private drc: ChangeDetectorRef,
    private toastService: ToastService,
    private dataUtilService: DataUtilService,
    private movimentacoesService: MovimentacoesService,
    private autenticadorService: AutenticadorService
  ) {
    this.carregarPerfil = new CarregarPerfil();
  }

  ngAfterContentChecked(): void {
    this.drc.detectChanges();
  }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);
    
    this.inicializarObjetos();
   
    if (!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }
    
    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.movimentacoesService.getById(id).subscribe((movimentacoes: Movimentacoes) => {
        this.movimentacoes = movimentacoes;
        
        BroadcastEventService.get('ON_CARREGAR_COMBO_PESQUISAVEL').emit(this.movimentacoes);

        if (!this.movimentacoes.contaBancaria) {
          this.movimentacoes.contaBancaria = new ContasBancaria();
          this.movimentacoes.contaBancaria.banco = new Banco();
        }
      });
    }

  }

  cadastrar() {
    if( !this.isValorTotalRateioValido() ) {return;}
    if( !this.isContaReembolsoValida()) { return; }

    this.movimentacoesService.cadastrar(this.movimentacoes).subscribe((movimentacao: Movimentacoes) => {
      this.toastService.showSucesso('Movimentação cadastrada com sucesso');
      this.autenticadorService.revalidarSessao();
      Object.assign(this.movimentacoes, movimentacao);

      BroadcastEventService.get('ON_CARREGAR_COMBO_PESQUISAVEL_MOVIMENTACOES').emit(this.movimentacoes);
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['movimentacoes']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  isValorTotalRateioValido() {
    let valorMovimentacao = this.movimentacoes.valorMovimentacao || 0;

    let valorTotal = 0;
    this.movimentacoes.rateios.forEach(rateio => {
      if(rateio.valorRateio) {
        if(rateio.statusPercentual) {
          valorTotal += (valorMovimentacao *  rateio.valorRateio)/100;
        } else {
          valorTotal += rateio.valorRateio;
        }
      }
    });

    if(Number(valorTotal.toFixed(2)) != Number(valorMovimentacao.toFixed(2))) {
      this.toastService.showSucesso('O valor do rateio está diferente do valor do movimento.');
      return false;
    }

    return true;
  }

  atualizar() {
    if( !this.isValorTotalRateioValido() ) {return;}
    if( !this.isContaReembolsoValida()) { return; }

    this.movimentacoesService.alterar(this.movimentacoes).subscribe((movimentacao: Movimentacoes) => {
      this.toastService.showSucesso('Registro atualizado com sucesso.');
      this.autenticadorService.revalidarSessao();
      Object.assign(this.movimentacoes, movimentacao);

      BroadcastEventService.get('ON_CARREGAR_COMBO_PESQUISAVEL_MOVIMENTACOES').emit(this.movimentacoes);
    });
  }

  inicializarObjetos() {
    this.movimentacoes = new Movimentacoes();
    this.movimentacoes.unidade = new Unidade();
    this.movimentacoes.empresa = new Empresa();
    this.movimentacoes.departamento = new Departamento();
    this.movimentacoes.rateios = []
    this.movimentacoes.rateiosUnidades = [];
    this.movimentacoes.itensMovimentacoes = [];
    this.movimentacoes.faturas = [];
    this.movimentacoes.pagamentosFatura = [];
    this.movimentacoes.contaBancaria = new ContasBancaria();
    this.movimentacoes.contaBancaria.banco = new Banco();
    this.movimentacoes.doador = new Doadores();
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }


  isContaReembolsoValida(): boolean {

    if(this.isContasReembolsoInvalidas) {
      this.toastService.showAlerta('Há reembolso(s) que não correspondem a contas dos projetos/programas.');
      return false;
    }

    const contaBancariaMovimentacao = this.movimentacoes.contaBancaria;

    const pagamentos:PagamentosFatura[] = this.movimentacoes.pagamentosFatura.filter(c => c.contaBancaria);
    
    if(pagamentos && pagamentos.length > 0) {
      pagamentos.forEach(pagamento => {
        const contaReembolso = pagamento.reembolsos.filter(c => c.contaBancaria.id === contaBancariaMovimentacao.id);
        if(contaReembolso.length > 0){
          this.toastService.showAlerta('Os pagamentos devem ter a conta de reembolso diferente da conta bancária.');
          return false;
        }
    
        const dataReembolso = pagamento.reembolsos
                                       .filter(c => c.data)
                                       .filter(c => this.dataUtilService.getDataTruncata(c.data).getTime() < this.dataUtilService.getDataTruncata(pagamento.dataPagamento).getTime()   );
        if(dataReembolso.length > 0) {
          this.toastService.showAlerta('A data do reembolso dos pagamento não pode ser menor que a data do pagamento.');
          return false;
        }

      });
      
    }
    return true;
  }
  
  carregarContasBancarios(evento) {
    // ABA DE PAGAMENTOS
    this.contasBancariasReembolso = [];
    if(evento.selectedIndex === 3) {    
      if(this.movimentacoes.rateios) {
        this.movimentacoes.rateios.forEach(rateio => {
          const contasPrograma = rateio.programa.contasCentrosCusto ? rateio.programa.contasCentrosCusto.map(c => c.contasBancaria) : [];
          const contasProjeto  = rateio.projeto.contasCentrosCusto ? rateio.projeto.contasCentrosCusto.map(c => c.contasBancaria) : [];
    
          if(contasPrograma) {
            contasPrograma.forEach(c => this.contasBancariasReembolso.push(c));
          }
          if(contasProjeto) {
            contasProjeto.forEach(c => this.contasBancariasReembolso.push(c));
          }
        });
      }

      this.isContasReembolsoInvalidas = false;
      if(this.movimentacoes.pagamentosFatura && this.movimentacoes.pagamentosFatura.length > 0) {
        this.movimentacoes.pagamentosFatura.forEach(pag => {
          if(pag.reembolsos && pag.reembolsos.length > 0) {
            pag.reembolsos.forEach(re => {
              const contas = this.contasBancariasReembolso.filter(conta => conta.id === re.contaBancaria.id );
              if(contas.length === 0) {
                re.contaBancaria = new ContasBancaria();
                this.isContasReembolsoInvalidas = true;
              }          
            })
          }
        })
      }
    }
   
  }


}
