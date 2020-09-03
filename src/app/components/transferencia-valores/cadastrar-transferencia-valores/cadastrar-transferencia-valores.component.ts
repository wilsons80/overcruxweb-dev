import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Banco } from 'src/app/core/banco';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { Departamento } from 'src/app/core/departamento';
import { Empresa } from 'src/app/core/empresa';
import { Movimentacoes } from 'src/app/core/movimentacoes';
import { Unidade } from 'src/app/core/unidade';
import { AutenticadorService } from 'src/app/services/autenticador/autenticador.service';
import { MovimentacoesService } from 'src/app/services/movimentacoes/movimentacoes.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import * as _ from 'lodash';
import { ContasBancariaService } from 'src/app/services/contas-bancaria/contas-bancaria.service';


@Component({
  selector: 'cadastrar-transferencia-valores',
  templateUrl: './cadastrar-transferencia-valores.component.html',
  styleUrls: ['./cadastrar-transferencia-valores.component.css']
})
export class CadastrarTransferenciaValoresComponent implements OnInit {
  movimentacoes: Movimentacoes;

  contasBancarias: ContasBancaria[];

  isAtualizar = false;  
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private drc: ChangeDetectorRef,
    private toastService: ToastService,
    private movimentacoesService: MovimentacoesService,
    private autenticadorService: AutenticadorService,
    private contasBancariaService: ContasBancariaService,
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
    
    this.contasBancariaService.getAllComboByInstituicaoLogada()
    .subscribe((contasBancarias: ContasBancaria[]) => {
      this.contasBancarias = contasBancarias;
    })


    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.movimentacoesService.getById(id).subscribe((movimentacoes: Movimentacoes) => {
        this.movimentacoes = movimentacoes;

        if (!this.movimentacoes.contaBancaria) {
          this.movimentacoes.contaBancaria = new ContasBancaria();
          this.movimentacoes.contaBancaria.banco = new Banco();
        }
        if (!this.movimentacoes.contaBancariaDestino) {
          this.movimentacoes.contaBancariaDestino = new ContasBancaria();
          this.movimentacoes.contaBancariaDestino.banco = new Banco();
        }
      });
    }

  }

  cadastrar() {
    if(!this.isContasTransferenciaValidas()){ return; }

    this.movimentacoes.stTipoMovimentacao = 'T';
    this.movimentacoes.unidade.idUnidade = this.autenticadorService.usuarioLogado.unidadeLogada.id;

    this.movimentacoesService.cadastrar(this.movimentacoes).subscribe(() => {
      this.router.navigate(['transferenciavalores']);
      this.toastService.showSucesso('Transferência cadastrada com sucesso');
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['transferenciavalores']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }
 

  atualizar() {
    if(!this.isContasTransferenciaValidas()){ return; }

    this.movimentacoesService.alterar(this.movimentacoes).subscribe(() => {
      this.toastService.showSucesso('Registro atualizado com sucesso.');
      this.autenticadorService.revalidarSessao();

      this.movimentacoesService.getById(this.movimentacoes.id)
      .subscribe( (movimentacao: Movimentacoes) => {
        Object.assign(this.movimentacoes, movimentacao);
      });
    });

  }

  inicializarObjetos() {
    this.movimentacoes = new Movimentacoes();
    this.movimentacoes.unidade = new Unidade();
    this.movimentacoes.empresa = new Empresa();
    this.movimentacoes.departamento = new Departamento();
    this.movimentacoes.rateios = []
    this.movimentacoes.itensMovimentacoes = [];
    this.movimentacoes.faturas = [];
    this.movimentacoes.pagamentosFatura = [];
    this.movimentacoes.contaBancaria = new ContasBancaria();
    this.movimentacoes.contaBancaria.banco = new Banco();
    this.movimentacoes.contaBancariaDestino = new ContasBancaria();
    this.movimentacoes.contaBancariaDestino.banco = new Banco();
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  carregarContaBancaria() {
    if (this.movimentacoes.contaBancaria && this.movimentacoes.contaBancaria.id) {
      this.movimentacoes.contaBancaria = _.cloneDeep(_.find(this.contasBancarias,  (c: ContasBancaria) => c.id === this.movimentacoes.contaBancaria.id));
    }
  }

  carregarContaBancariaDestino() {
    if (this.movimentacoes.contaBancariaDestino && this.movimentacoes.contaBancariaDestino.id) {
      this.movimentacoes.contaBancariaDestino = _.cloneDeep(_.find(this.contasBancarias,  (c: ContasBancaria) => c.id === this.movimentacoes.contaBancariaDestino.id));
    }
  }


  validarValorDocumento(valor) {
    if (valor.includes("-")) {
      this.movimentacoes.valorMovimentacao = null;
      this.toastService.showAlerta('O valor do documento não pode ser negativo, informe outro valor.');
    }
  }

  isContasTransferenciaValidas(): boolean {
    if(this.movimentacoes.contaBancaria.id === this.movimentacoes.contaBancariaDestino.id) {
      this.toastService.showAlerta('A conta de origem não pode ser a mesma conta de destino.')
      return false;
    }
    return true;
  }

}
