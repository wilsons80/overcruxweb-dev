import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { RelatorioBeneficiarioService } from 'src/app/services/relatorio-beneficiario/relatorio-beneficiario.service';
import { LoadingPopupService } from 'src/app/services/loadingPopup/loading-popup.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FileUtils } from 'src/app/utils/file-utils';
import * as _ from 'lodash';
import { ComboPessoaFisica } from 'src/app/core/combo-pessoa-fisica';
import { ComboAluno } from 'src/app/core/combo-aluno';
import { ComboPrograma } from 'src/app/core/combo-programa';
import { ComboProjeto } from 'src/app/core/combo-projeto';
import { Unidade } from 'src/app/core/unidade';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { PessoaFisicaService } from 'src/app/services/pessoa-fisica/pessoa-fisica.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { FuncoesUteisService } from 'src/app/services/commons/funcoes-uteis.service';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Acesso } from 'src/app/core/acesso';
import { MatTableDataSource } from '@angular/material/table';
import { ExportacaoDadosAluno } from 'src/app/core/exportacao-dados-aluno';
import { SelectionModel } from '@angular/cdk/collections';
import { ListaCompletaDadosExportar } from 'src/app/core/lista-completa-dados-exportar';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { ExportacaoDadosAlunoService } from 'src/app/services/exportacao-dados-aluno/exportacao-dados-aluno.service';

export interface TipoRelatorioBeneficiario {
  tipo: string;
  descricao: string;
}

export class FilterExportacao{
  beneficiario: ComboAluno;
  cpfAluno: ComboPessoaFisica;
  maeAluno: ComboPessoaFisica;
  paiAluno: ComboPessoaFisica;
  responsavel: ComboPessoaFisica;
  dataInicioInstituicao: Date;
  dataFimInstituicao: Date;
  programa: ComboPrograma;
  projeto: ComboProjeto;
  unidade: Unidade;
}

@Component({
  selector: 'relatorios-beneficiarios',
  templateUrl: './relatorios-beneficiarios.component.html',
  styleUrls: ['./relatorios-beneficiarios.component.css'],
  providers: [CpfPipe],
})
export class RelatoriosBeneficiariosComponent implements OnInit {

  MIMETYPE_PDF   = "pdf";
  MIMETYPE_EXCEL = "xls";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  comboCpf: ComboPessoaFisica[];
  comboMae: ComboPessoaFisica[];
  comboPai: ComboPessoaFisica[];
  comboResponsaveis: ComboPessoaFisica[];
  comboUnidades: Unidade[];

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  displayedColumns: string[] = ['select', 'matricula','beneficiario','nomeMae','nomePai','unidade','dataEntrada', 'dataDesligamento'];
  dataSource: MatTableDataSource<ExportacaoDadosAluno> = new MatTableDataSource();
  mostrarTabela: boolean = false;
  msg: string;

  selection = new SelectionModel<ExportacaoDadosAluno>(true, []);

  filtro: FilterExportacao = new FilterExportacao();
  exportacaoDadosAlunos: ExportacaoDadosAluno[]

  tiposRelatorios: TipoRelatorioBeneficiario[] = [
    {tipo: 'FM', descricao: 'Ficha Matrícula'},
    {tipo: 'DE', descricao: 'Declaração'},
    {tipo: 'PE', descricao: 'Passe Estudantil'}
  ];
  tipoRelatorioSelecionado: TipoRelatorioBeneficiario;


  panelBeneficiarioOpenState = false;
  panelFamiliarOpenState     = false;

  constructor(
    private exportacaoDadosAlunoService: ExportacaoDadosAlunoService,
    private toastService: ToastService,
    private dataUtilService: DataUtilService,
    private router: Router,
    private fileUtils: FileUtils,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private loadingPopupService: LoadingPopupService,
    private relatorioBeneficiarioService: RelatorioBeneficiarioService,
    private cpfPipe: CpfPipe,
    private funcoesUteisService: FuncoesUteisService,
    private pessoaFisicaService: PessoaFisicaService,
    private unidadeService: UnidadeService    
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
    this.exportacaoDadosAlunoService.getFilter(this.filtro.cpfAluno.cpf,
                                               this.filtro.beneficiario.id,
                                               this.filtro.maeAluno.id,
                                               this.filtro.paiAluno.id,
                                               this.filtro.programa.id,
                                               this.filtro.projeto.id,
                                               this.filtro.unidade.idUnidade,
                                               this.filtro.responsavel.id,
                                               this.filtro.dataInicioInstituicao,
                                               this.filtro.dataFimInstituicao)
      .subscribe((dados: ExportacaoDadosAluno[]) => {
      this.exportacaoDadosAlunos = dados;
      
      this.dataSource.data = dados ? dados : [];
      this.verificaMostrarTabela(dados);

      this.masterToggle();
    })
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

  verificaMostrarTabela(lista: ExportacaoDadosAluno[]) {
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
    this.relatorioBeneficiarioService.showRelatorio(this.tipoRelatorioSelecionado.tipo, mimetype, listaIdsPessoaFisica).subscribe(
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
    this.filtro = new FilterExportacao();

    this.filtro.beneficiario = new ComboAluno();
    this.filtro.cpfAluno     = new ComboPessoaFisica();
    this.filtro.maeAluno     = new ComboPessoaFisica();
    this.filtro.paiAluno     = new ComboPessoaFisica();
    this.filtro.responsavel  = new ComboPessoaFisica();
    this.filtro.programa     = new ComboPrograma();
    this.filtro.projeto      = new ComboProjeto();
    this.filtro.unidade      = new Unidade();

    this.selection.clear();
    this.exportacaoDadosAlunos = [];
    this.dataSource.data = [];

    this.tipoRelatorioSelecionado = null;
  }
  
  onValorChange(event: any) {
    this.filtro.beneficiario = event;
  }




  private carregarCombos(){
    this.unidadeService.getAllByInstituicaoDaUnidadeLogada().subscribe((unidades: Unidade[]) => {
      this.comboUnidades = unidades;
    });

    this.pessoaFisicaService.getAllPessoasByCombo().subscribe((pessoas: ComboPessoaFisica[]) => {
      this.comboMae   = pessoas;
      this.comboPai   = pessoas;
      this.comboCpf   = pessoas;
      
      this.comboMae = this.ordenarComboMaeDistinct(this.comboMae);
      this.comboPai = this.ordenarComboPaiDistinct(this.comboPai);
      this.comboCpf = this.ordenarComboCpfDistinct(this.comboCpf);
    });
  }

  private ordenarComboCpfDistinct(comboCpf: any): any[] {
    comboCpf.forEach(a => {
      a.cpf = a.cpf || '00000000000';
      a.cpf = this.cpfPipe.transform(a.cpf);
    });
    comboCpf = this.funcoesUteisService.ordernarArray(comboCpf, 'cpf');
    comboCpf = this.funcoesUteisService.arrayDistinct(comboCpf, 'cpf');
    return comboCpf;
  }

  private ordenarComboMaeDistinct(comboMae: any): any[] {
    comboMae = comboMae.filter(a => !!a.nomeMae);
    comboMae = this.funcoesUteisService.ordernarArray(comboMae, 'nomeMae');
    comboMae = this.funcoesUteisService.arrayDistinct(comboMae, 'nomeMae');
    return comboMae;
  }

  private ordenarComboPaiDistinct(comboPai: any): any[] {
    comboPai = this.comboPai.filter(a => !!a.nomePai);
    comboPai = this.funcoesUteisService.ordernarArray(comboPai, 'nomePai');
    comboPai = this.funcoesUteisService.arrayDistinct(comboPai, 'nomePai');
    return comboPai;
  }
  
  onMascaraDataInput(event) {
    return this.dataUtilService.onMascaraDataInput(event);
  }

  onValorChangePrograma(registro: any) {
    this.filtro.programa = registro;
  }

  onValorChangeProjeto(registro: any) {
    this.filtro.projeto = registro;
  }






}
