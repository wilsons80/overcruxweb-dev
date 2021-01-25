import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { Cargo } from 'src/app/core/cargo';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { ColaboradoresGestaoPessoal } from 'src/app/core/colaboradores-gestao-pessoal';
import { ComboFuncionario } from 'src/app/core/combo-funcionario';
import { ComboPessoaFisica } from 'src/app/core/combo-pessoa-fisica';
import { Departamento } from 'src/app/core/departamento';
import { Unidade } from 'src/app/core/unidade';
import { Funcoes } from 'src/app/core/funcoes';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { FuncoesService } from 'src/app/services/funcoes/funcoes.service';
import { LoadingPopupService } from 'src/app/services/loadingPopup/loading-popup.service';
import { RelatorioDpService } from 'src/app/services/relatorio-dp/relatorio-dp.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { FileUtils } from 'src/app/utils/file-utils';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { DepartamentoService } from 'src/app/services/departamento/departamento.service';
import { ComboPrograma } from 'src/app/core/combo-programa';
import { ComboProjeto } from 'src/app/core/combo-projeto';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { CnpjPipe } from 'src/app/pipes/cnpj.pipe';
import { RelatorioFaturasPagarService } from 'src/app/services/relatorio-financeiro/faturas-pagar/relatorio-faturas-pagar.service';
import { RelatorioNormativaPagamentosService } from 'src/app/services/relatorio-financeiro/normativa-pagamentos/relatorio-normativa-pagamentos.service';
import { RelatorioSaldoProjetoService } from 'src/app/services/relatorio-financeiro/saldo-projeto/relatorio-saldo-projeto.service';
import { ContasBancariaService } from 'src/app/services/contas-bancaria/contas-bancaria.service';
import { PlanosContas } from 'src/app/core/planos-contas';
import { CategoriasContabeisService } from 'src/app/services/categorias-contabeis/categorias-contabeis.service';
import { Observable } from 'rxjs';

export interface TipoRelatorio {
  tipo: string;
  descricao: string;
  nomeRelatorio: string;
}

export class Filter{
  fornecedorColaborador: any; //não está tipado pq o combo-pesquisável usa lista com objeto diferente
  contaBancaria: ContasBancaria;
  planoConta: PlanosContas;
  programa: ComboPrograma;
  projeto: ComboProjeto;
  dataInicio: Date;
  dataFim: Date;
  dataInicioVenc: Date;
  dataFimVenc: Date;
}

@Component({
  selector: 'relatorios-financeiro',
  templateUrl: './relatorios-financeiro.component.html',
  styleUrls: ['./relatorios-financeiro.component.css'],
  providers: [CpfPipe, CnpjPipe],
})
export class RelatoriosFinanceiroComponent implements OnInit {
  MIMETYPE_PDF   = "pdf";
  MIMETYPE_EXCEL = "xls";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  comboPlanosContas: PlanosContas[];
  comboContasBancarias: ContasBancaria[];

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  displayColunasNormativa: string[] = ['select', 'programaprojeto','fornecedor','numerodocumento','cnpjcpf', 'datadocumento', 'valormovimentacao', 'valorpagamento', 'datapagameento', 'rubrica'];
  displayColunasFaturaPagar: string[] = ['select', 'programaprojeto','fornecedor','numerodocumento','cnpjcpf', 'datadocumento', 'valormovimentacao', 'datavencimento', 'valorfatura', 'numeroparcela', 'rubrica'];
  displayColunasSaldoProjeto: string[] = ['select', 'programaprojeto','fornecedor','numerodocumento','cnpjcpf', 'datadocumento', 'valormovimentacao', 'valorpagamento', 'datapagameento', 'rubrica'];


  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  mostrarTabela: boolean = false;
  msg: string;

  selection = new SelectionModel<any>(true, []);

  servicoBusca: any;
  servicoBusca$: any;

  filtro: Filter = new Filter();
  dadosDataSource: any[]

  tiposRelatorios: TipoRelatorio[] = [
    {tipo: 'NP', descricao: 'Normativa Pagamentos', nomeRelatorio: 'normativa_pagamentos'},
    {tipo: 'FP', descricao: 'Faturas a Pagar', nomeRelatorio: 'faturas_pagar'},
    {tipo: 'SP', descricao: 'Saldo por Projeto', nomeRelatorio: 'saldo_projeto'}
  ];
  tipoRelatorioSelecionado: TipoRelatorio;


  constructor(
    private toastService: ToastService,
    private dataUtilService: DataUtilService,
    private fileUtils: FileUtils,
    private activatedRoute: ActivatedRoute,
    private loadingPopupService: LoadingPopupService,
    private drc: ChangeDetectorRef,
    private relatorioFaturasPagarService: RelatorioFaturasPagarService,
    private relatorioNormativaPagamentosService: RelatorioNormativaPagamentosService,
    private relatorioSaldoProjetoService: RelatorioSaldoProjetoService,
    private contasBancariaService: ContasBancariaService,
    private categoriasContabeisService: CategoriasContabeisService,
  ) { 
    this.carregarPerfil = new CarregarPerfil();
  }

  ngAfterContentChecked(): void {
    this.drc.detectChanges();
  }

  ngOnInit(): void {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.limpar();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.carregarCombos();
  }

  carregarTipoRelatorio() {
    this.limparDataSourcer();
    this.prepararBusca();
  }

  prepararBusca() {
    if(this.tipoRelatorioSelecionado) {
      switch(this.tipoRelatorioSelecionado.tipo) { 
        case 'NP': { 
          this.displayedColumns = this.displayColunasNormativa;
          this.prepararBuscaNormativaPagamentos();
          break; 
        } 
        case 'FP': { 
          this.displayedColumns = this.displayColunasFaturaPagar;
          this.prepararBuscaFaturaPagar();
          break; 
        } 
        case 'SP': { 
          this.displayedColumns = this.displayColunasSaldoProjeto;
          this.prepararBuscaSaldoProjeto();
          break; 
        } 
        default: { 
          this.displayedColumns = [];
          break; 
        } 
     } 
    }
  }


  
  prepararBuscaNormativaPagamentos(): Observable<any>{
    if(this.tipoRelatorioSelecionado && this.tipoRelatorioSelecionado.tipo === 'NP') { 
      let programaprojeto = '';
      let cnpjcpf         = '';
      
      if(this.filtro.programa && this.filtro.programa.id) {
        programaprojeto = this.filtro.programa.nome;
      }
      if(this.filtro.projeto && this.filtro.projeto.id) {
        programaprojeto = this.filtro.projeto.nome;
      }
      
      this.servicoBusca = this.relatorioNormativaPagamentosService;
      this.servicoBusca$ = this.relatorioNormativaPagamentosService.getFilter(this.filtro.planoConta.id, cnpjcpf, programaprojeto, this.filtro.dataInicio, this.filtro.dataFim);
    }
    return this.servicoBusca$;
  }

  prepararBuscaFaturaPagar(): Observable<any>{
    if(this.tipoRelatorioSelecionado && this.tipoRelatorioSelecionado.tipo === 'FP') { 
      let programaprojeto = '';
      let cnpjcpf         = '';
      
      if(this.filtro.programa && this.filtro.programa.id) {
        programaprojeto = this.filtro.programa.nome;
      }
      if(this.filtro.projeto && this.filtro.projeto.id) {
        programaprojeto = this.filtro.projeto.nome;
      }
      
      this.servicoBusca = this.relatorioFaturasPagarService;
      this.servicoBusca$ = this.relatorioFaturasPagarService.getFilter(this.filtro.planoConta.id, 
                                                                       cnpjcpf, 
                                                                       programaprojeto, 
                                                                       this.filtro.dataInicio, 
                                                                       this.filtro.dataFim,
                                                                       this.filtro.dataInicioVenc, 
                                                                       this.filtro.dataFimVenc);
    }
    return this.servicoBusca$;
  }


  prepararBuscaSaldoProjeto(): Observable<any>{
    if(this.tipoRelatorioSelecionado && this.tipoRelatorioSelecionado.tipo === 'SP') { 
      let programaprojeto = '';
      
      if(this.filtro.programa && this.filtro.programa.id) {
        programaprojeto = this.filtro.programa.nome;
      }
      if(this.filtro.projeto && this.filtro.projeto.id) {
        programaprojeto = this.filtro.projeto.nome;
      }
     
      this.servicoBusca  = this.relatorioSaldoProjetoService;
      this.servicoBusca$ = this.relatorioSaldoProjetoService.getFilter(this.filtro.contaBancaria.id, 
                                                                       programaprojeto, 
                                                                       this.filtro.dataInicio, 
                                                                       this.filtro.dataFim);
    }
    return this.servicoBusca$;
  }

  consultar() {
    this.limparDataSourcer();
    this.prepararBusca();    

    this.loadingPopupService.mostrarMensagemDialog('Buscando, aguarde...');
    this.servicoBusca$
    .subscribe(
      (dados: any[]) => {
        this.loadingPopupService.closeDialog();
        this.dadosDataSource = dados;
      
        this.dataSource.data = dados ? dados : [];
        this.verificaMostrarTabela(dados);

        this.masterToggle();
    },
    (error) => {
      this.toastService.showAlerta("Não foi possível recuperar os dados.")
      this.loadingPopupService.closeDialog();
    });
  }


  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  verificaMostrarTabela(lista: ColaboradoresGestaoPessoal[]) {
    if (!lista || lista.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma registro encontrado para o relatório."
    } else {
      this.mostrarTabela = true;
    }
  }

  public handlePageBottom(event: PageEvent) {
    this.paginator.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.page.emit(event);
  }

  getRelatorio(mimetype: string) {
    if(this.selection.selected && this.selection.selected.length === 0) {
      this.toastService.showAlerta('Selecione pelo menos um registro que deseja gerar o relatório.');
      return;
    }
    
    this.loadingPopupService.mostrarMensagemDialog('Gerando relatório ..');
    const dados = this.selection.selected.map(d => d.idPessoaFisica);
    this.servicoBusca.showRelatorio(this.tipoRelatorioSelecionado.tipo, mimetype, dados).subscribe(
      response => {
        if(mimetype === this.MIMETYPE_PDF) {
          this.fileUtils.showFilePDF(response);
        } else {
          this.fileUtils.downloadFileXLS(response, this.tipoRelatorioSelecionado.nomeRelatorio + "xlsx");
        }
      },
      responseError => {
        const dataView = new DataView(responseError.error);
        const decoder = new TextDecoder('utf8');
        const resp = JSON.parse(decoder.decode(dataView));
        this.toastService.showAlerta(resp.mensagem);

      }).add(() => {
        this.loadingPopupService.closeDialog();
      });
  }


  limparDataSourcer() {
    this.filtro = new Filter();

    this.filtro.contaBancaria  = new ContasBancaria();
    this.filtro.planoConta     = new PlanosContas();
    this.filtro.programa     = new ComboPrograma();
    this.filtro.projeto     = new ComboProjeto();

    this.selection.clear();
    this.dadosDataSource = [];
    this.dataSource.data = [];
  }

  limpar() {
    this.limparDataSourcer();

    this.mostrarTabela = false;
    this.tipoRelatorioSelecionado = null;
  }


  private carregarCombos(){
    this.categoriasContabeisService.getAllView(false).subscribe((planosContas: PlanosContas[]) => {
      this.comboPlanosContas = planosContas;
    });

    this.contasBancariaService.getAllComboByInstituicaoLogada().subscribe((contasBancarias: ContasBancaria[]) => {
      this.comboContasBancarias = contasBancarias;
    });
  }

  onMascaraDataInput(event) {
    return this.dataUtilService.onMascaraDataInput(event);
  }

  carregarContaContabil(event){
    if (event) {
      this.filtro.planoConta = _.cloneDeep(_.find(this.comboPlanosContas,  (c) => c.id === event.id));
    } else {
      this.filtro.planoConta = new PlanosContas();
    }
  }

}
