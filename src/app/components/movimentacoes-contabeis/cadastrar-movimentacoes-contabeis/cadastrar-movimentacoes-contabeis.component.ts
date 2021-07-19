import { CarregarPerfil } from '../../../core/carregar-perfil';
import { Banco } from '../../../core/banco';
import { ListaBancosService } from '../../../services/listaBancos/lista-bancos.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { Acesso } from 'src/app/core/acesso';
import { ContasBancariaService } from 'src/app/services/contas-bancaria/contas-bancaria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { Unidade } from 'src/app/core/unidade';
import * as _ from 'lodash';
import { PlanosContas } from 'src/app/core/planos-contas';
import { CategoriasContabeisService } from 'src/app/services/categorias-contabeis/categorias-contabeis.service';
import { MovimentacoesContabeis } from 'src/app/core/movimentacoes-contabeis';
import { MovimentacoesContabeisService } from 'src/app/services/movimentacoes-contabeis/movimentacoes-contabeis.service';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { Projeto } from 'src/app/core/projeto';
import { Programa } from 'src/app/core/programa';
import { CategoriasContabeis } from 'src/app/core/categorias-contabeis';

@Component({
  selector: 'cadastrar-movimentacoes-contabeis',
  templateUrl: './cadastrar-movimentacoes-contabeis.component.html',
  styleUrls: ['./cadastrar-movimentacoes-contabeis.component.css']
})
export class CadastrarMovimentacoesContabeisComponent implements OnInit {

  @ViewChild('campoPrograma01') campoPrograma01;
  @ViewChild('campoProjeto01') campoProjeto01;
  @ViewChild('campoCategoriaOrigem01') campoCategoriaOrigem01;
  @ViewChild('campoCategoriaDestino01') campoCategoriaDestino01;

  @ViewChild('campoPrograma02') campoPrograma02;
  @ViewChild('campoProjeto02') campoProjeto02;
  @ViewChild('campoCategoriaOrigem02') campoCategoriaOrigem02;
  @ViewChild('campoCategoriaDestino02') campoCategoriaDestino02;


  movimentacaoContabil: MovimentacoesContabeis;

  isAtualizar = false;
  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  maxDate = new Date(9999, 12, 31);
  minDate = new Date(1753, 1, 1);
  planosContas: PlanosContas[];

  constructor(
    private movimentacoesContabeisService: MovimentacoesContabeisService,
    private categoriasContabeisService: CategoriasContabeisService,
    private activatedRoute: ActivatedRoute,
    private dataUtilService: DataUtilService,
    private drc: ChangeDetectorRef,
    private router: Router,
    private toastService: ToastService,
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
    
    this.categoriasContabeisService.getAllViewPlanosContas().subscribe((planosContas: PlanosContas[]) => {
      this.planosContas = planosContas;
      this.preencherCombo();
    });

    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.movimentacoesContabeisService.getById(id).subscribe((movimentacao: MovimentacoesContabeis) => {
        this.movimentacaoContabil = movimentacao;
        this.preencherCombo();
      });
    }

  }

  ngAfterContentChecked(): void {
    this.drc.detectChanges();
  }

  private preencherCombo(){
    if (this.movimentacaoContabil?.categoriaOrigem02?.id && this.planosContas?.length) {
      this.movimentacaoContabil.categoriaOrigem02 = _.find(this.planosContas, { id: this.movimentacaoContabil?.categoriaOrigem02?.id});
    }

    if (this.movimentacaoContabil?.categoriaOrigem01?.id && this.planosContas?.length) {
      this.movimentacaoContabil.categoriaOrigem01 = _.find(this.planosContas, { id: this.movimentacaoContabil?.categoriaOrigem01?.id});
    }

    if (this.movimentacaoContabil?.categoriaDestino02?.id && this.planosContas?.length) {
      this.movimentacaoContabil.categoriaDestino02 = _.find(this.planosContas, { id: this.movimentacaoContabil?.categoriaDestino02?.id});
    }
    if (this.movimentacaoContabil?.categoriaDestino01?.id && this.planosContas?.length) {
      this.movimentacaoContabil.categoriaDestino01 = _.find(this.planosContas, { id: this.movimentacaoContabil?.categoriaDestino01?.id});
    }
  } 

  cadastrar() {
    this.movimentacoesContabeisService.cadastrar(this.movimentacaoContabil).subscribe(() => {
      this.router.navigate(['movimentacoescontabeis']);
      this.toastService.showSucesso('Movimentação contábil cadastrada com sucesso.');
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['movimentacoescontabeis']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }


  atualizar() {
    this.movimentacoesContabeisService.alterar(this.movimentacaoContabil).subscribe(() => {
      this.router.navigate(['movimentacoescontabeis']);
      this.toastService.showSucesso('Movimentação contábil atualizada com sucesso.');
    });

  }


  inicializarObjetos() {
    this.movimentacaoContabil = new MovimentacoesContabeis();
    this.movimentacaoContabil.programa01 = new Programa();
    this.movimentacaoContabil.projeto01  = new Projeto();
    this.movimentacaoContabil.programa02 = new Programa();
    this.movimentacaoContabil.projeto02  = new Projeto();
    
    this.movimentacaoContabil.categoriaOrigem01  = new CategoriasContabeis();
    this.movimentacaoContabil.categoriaDestino01 = new CategoriasContabeis();
    this.movimentacaoContabil.categoriaOrigem02  = new CategoriasContabeis();
    this.movimentacaoContabil.categoriaDestino02 = new CategoriasContabeis();  
    
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  retiraMascara(objeto:any) {
    return objeto.replace(/\D/g, '');
  }

  validarValorMovimento(valor) {
    if (valor.includes("-")) {
      this.movimentacaoContabil.valorMovimentacao = null;
      this.toastService.showAlerta('O valor do documento não pode ser negativo, informe outro valor.');
    }
  }

  onMascaraDataInput(event) {
    return this.dataUtilService.onMascaraDataInput(event);
  }


  onValorChangePrograma(registro: any) {
    this.movimentacaoContabil.programa01 = registro;    
    if(registro) {
      this.movimentacaoContabil.programa01.id = registro.id;
      this.campoProjeto01.comboProjeto.itensSelect.ngControl.reset()
      this.movimentacaoContabil.projeto01 = new Projeto();
    } else{  
      this.movimentacaoContabil.programa01 = new Programa();
    }
  }

  onValorChangeProjeto(registro: any) {
    this.movimentacaoContabil.projeto01 = registro;    
    if(registro) {
      this.movimentacaoContabil.projeto01.id = registro.id;
      this.campoPrograma01.comboPrograma.itensSelect.ngControl.reset();      
      this.movimentacaoContabil.programa01 = new Programa();
    } else{
      this.movimentacaoContabil.projeto01 = new Projeto();
    }
  }

  onValorChangePrograma02(registro: any) {
    this.movimentacaoContabil.programa02 = registro;    
    if(registro) {
      this.movimentacaoContabil.programa02.id = registro.id;
      this.campoProjeto02.comboProjeto.itensSelect.ngControl.reset()
      this.movimentacaoContabil.projeto02 = new Projeto();
    } else{  
      this.movimentacaoContabil.programa02 = new Programa();
    }
  }

  onValorChangeProjeto02(registro: any) {
    this.movimentacaoContabil.projeto02 = registro;    
    if(registro) {
      this.movimentacaoContabil.projeto02.id = registro.id;
      this.campoPrograma02.comboPrograma.itensSelect.ngControl.reset();      
      this.movimentacaoContabil.programa02 = new Programa();
    } else{
      this.movimentacaoContabil.projeto02 = new Projeto();
    }
  }

  carregarContaOrigem01(idConta: number){
    this.movimentacaoContabil.categoriaOrigem01 = _.cloneDeep(_.find(this.planosContas, { id: idConta}));

    if(idConta && this.movimentacaoContabil.categoriaDestino01?.id && idConta === this.movimentacaoContabil.categoriaDestino01.id ){
      this.movimentacaoContabil.categoriaOrigem01 = null;
      this.campoCategoriaOrigem01.itensSelect.ngControl.control.setValue(null);  
      this.toastService.showAlerta('A conta de origem (01) não pode ser a mesma de destino (01).');
    }
    
  }

  carregarContaDestino01(idConta: number){
    this.movimentacaoContabil.categoriaDestino01 = _.cloneDeep(_.find(this.planosContas, { id: idConta}));

    if(idConta && this.movimentacaoContabil.categoriaOrigem01?.id && idConta === this.movimentacaoContabil.categoriaOrigem01.id ){
      this.movimentacaoContabil.categoriaDestino01 = null;
      this.campoCategoriaDestino01.itensSelect.ngControl.control.setValue(null);    
      this.toastService.showAlerta('A conta de destino (01) não pode ser a mesma da origem (01).');  
    }  
  }

  carregarContaOrigem02(idConta: number){
    this.movimentacaoContabil.categoriaOrigem02 = _.cloneDeep(_.find(this.planosContas, { id: idConta}));

    if(idConta && this.movimentacaoContabil.categoriaDestino02 && idConta === this.movimentacaoContabil.categoriaDestino02.id ){
      this.movimentacaoContabil.categoriaOrigem02 = null;
      this.campoCategoriaOrigem02.itensSelect.ngControl.control.setValue(null);  
      this.toastService.showAlerta('A conta de origem (02) não pode ser a mesma de destino (02).');
    }

  }

  carregarContaDestino02(idConta: number){
    this.movimentacaoContabil.categoriaDestino02 = _.cloneDeep(_.find(this.planosContas, { id: idConta}));

    if(idConta && this.movimentacaoContabil.categoriaOrigem02 && idConta === this.movimentacaoContabil.categoriaOrigem02.id ){
      this.movimentacaoContabil.categoriaDestino02 = null;
      this.campoCategoriaDestino02.itensSelect.ngControl.control.setValue(null);    
      this.toastService.showAlerta('A conta de destino (02) não pode ser a mesma da origem (02).');  
    }  
  }

}