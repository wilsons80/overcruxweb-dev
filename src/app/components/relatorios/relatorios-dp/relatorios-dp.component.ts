import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
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

export interface TipoRelatorioDp {
  tipo: string;
  descricao: string;
}

export class Filter{
  funcionario: ComboFuncionario;
  cpfAluno: ComboPessoaFisica;
  dataInicio: Date;
  dataFim: Date;
  unidade: Unidade;
  departamento: Departamento;
  cargo: Cargo;
  funcao: Funcoes;
}

@Component({
  selector: 'relatorios-dp',
  templateUrl: './relatorios-dp.component.html',
  styleUrls: ['./relatorios-dp.component.css'],
  providers: [CpfPipe],
})
export class RelatoriosDpComponent implements OnInit {
  MIMETYPE_PDF   = "pdf";
  MIMETYPE_EXCEL = "xls";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  comboUnidades: Unidade[];
  comboFuncoes: Funcoes[];
  comboCargos: Cargo[];
  comboDepartamentos:Departamento[];

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  displayedColumns: string[] = ['select', 'colaborador','email','unidade','departamento','cargo', 'funcao'];
  dataSource: MatTableDataSource<ColaboradoresGestaoPessoal> = new MatTableDataSource();
  mostrarTabela: boolean = false;
  msg: string;

  selection = new SelectionModel<ColaboradoresGestaoPessoal>(true, []);

  filtro: Filter = new Filter();
  colaboradoresGestaoPessoal: ColaboradoresGestaoPessoal[]

  tiposRelatorios: TipoRelatorioDp[] = [
    {tipo: 'AN', descricao: 'Aniversariantes'},
    {tipo: 'CE', descricao: 'Planilha Censo'},
    {tipo: 'EP', descricao: 'Exame Periódico'},
    {tipo: 'FU', descricao: 'Funções'}
  ];
  tipoRelatorioSelecionado: TipoRelatorioDp;


  panelBeneficiarioOpenState = false;
  panelFamiliarOpenState     = false;


  constructor(
    private toastService: ToastService,
    private dataUtilService: DataUtilService,
    private fileUtils: FileUtils,
    private activatedRoute: ActivatedRoute,
    private loadingPopupService: LoadingPopupService,
    private relatorioDpService: RelatorioDpService,
    private unidadeService: UnidadeService,
    private funcoesService: FuncoesService,
    private cargosService: CargosService,
    private departamentoService: DepartamentoService,
  ) { 
    this.carregarPerfil = new CarregarPerfil();
  }


  ngOnInit(): void {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.limpar();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.carregarCombos();
  }


  consultar() {
    this.selection.clear();
    this.colaboradoresGestaoPessoal = [];
    this.dataSource.data = [];

    this.loadingPopupService.mostrarMensagemDialog('Buscando, aguarde...');
    this.relatorioDpService.getFilter(this.filtro.cpfAluno?.cpf,
                                      this.filtro.funcionario?.id,
                                      this.filtro.unidade?.idUnidade,
                                      this.filtro.departamento?.idDepartamento,
                                      this.filtro.cargo?.id,
                                      this.filtro.funcao?.id,
                                      this.filtro.dataInicio,
                                      this.filtro.dataFim)
    .subscribe(
      (dados: ColaboradoresGestaoPessoal[]) => {
        this.loadingPopupService.closeDialog();
        this.colaboradoresGestaoPessoal = dados;
      
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

    const listaIdsPessoaFisica = this.selection.selected.map(d => d.idPessoaFisica);
    this.relatorioDpService.showRelatorio(this.tipoRelatorioSelecionado.tipo, mimetype, listaIdsPessoaFisica).subscribe(
      response => {
        if(mimetype === this.MIMETYPE_PDF) {
          this.fileUtils.showFilePDF(response);
        } else {
          this.fileUtils.downloadFileXLS(response, "relatório.xlsx");
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

  limpar() {
    this.filtro = new Filter();

    this.filtro.funcionario  = new ComboFuncionario();
    this.filtro.cpfAluno     = new ComboPessoaFisica();
    this.filtro.unidade      = new Unidade();
    this.filtro.departamento = new Departamento();
    this.filtro.cargo        = new Cargo();
    this.filtro.funcao       = new Funcoes();

    this.selection.clear();
    this.colaboradoresGestaoPessoal = [];
    this.dataSource.data = [];
    this.mostrarTabela = false;
    this.tipoRelatorioSelecionado = null;
  }
  

  onValorChangeFuncionario(registro: any) {
    this.filtro.funcionario = registro;
  }

  private carregarCombos(){
    this.unidadeService.getAllByInstituicaoDaUnidadeLogada().subscribe((unidades: Unidade[]) => {
      this.comboUnidades = unidades;
    });

    this.funcoesService.getAll().subscribe((funcoes: Funcoes[]) => {
      this.comboFuncoes = funcoes;
    });

    this.cargosService.getAll().subscribe((cargos: Cargo[]) => {
      this.comboCargos = cargos;
    });

    this.departamentoService.getAllCombo().subscribe((departamentos:Departamento[]) => {
      this.comboDepartamentos = departamentos;
    })
  }

  onMascaraDataInput(event) {
    return this.dataUtilService.onMascaraDataInput(event);
  }


}
