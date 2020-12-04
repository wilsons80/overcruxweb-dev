import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { Conciliacao } from 'src/app/core/conciliacao';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { ConciliacaoService } from 'src/app/services/conciliacao/conciliacao.service';
import { ContasBancariaService } from 'src/app/services/contas-bancaria/contas-bancaria.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { FileUtils } from 'src/app/utils/file-utils';
import { LoadingPopupService } from 'src/app/services/loadingPopup/loading-popup.service';
import { MovimentosBancariosInconsistentesComponent } from '../common/movimentos-bancarios-inconsistentes/movimentos-bancarios-inconsistentes.component';
import { SaldosContasBancariaService } from 'src/app/services/saldos-contas-bancaria/saldos-contas-bancaria.service';

class Filter {
  contaBancaria: ContasBancaria;
  dataInicio: Date;
  dataFim: Date;
}

class SaldoContaBancaria {
  saldoInicial: number;
  saldoFinal: number;
}

@Component({
  selector: 'conciliacao',
  templateUrl: './conciliacao.component.html',
  styleUrls: ['./conciliacao.component.css']
})
export class ConciliacaoComponent implements OnInit {
 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selection = new SelectionModel<Conciliacao>(true, []);
  
  conciliacoes: Conciliacao[];
  contasBancarias: ContasBancaria[];

  filtro = new Filter();
  saldoContaBancaria = null;

  displayedColumns: string[] = ['select','codigo', 'tipo', 'situacao', 'documento', 'dataConciliacao', 'banco',  'categoria', 'fornecedor', 'complemento', 'centroCusto', 'grupoContas', 'valor'];
  dataSource: MatTableDataSource<Conciliacao> = new MatTableDataSource();
  mostrarTabela: boolean = false;
  msg: string;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  inconsistentes: Conciliacao[] = [];


  constructor(
    private conciliacaoService: ConciliacaoService,
    private contasBancariaService: ContasBancariaService,
    private toastService: ToastService,
    private dataUtilService: DataUtilService,
    private router: Router,
    private fileUtils: FileUtils,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private loadingPopupService: LoadingPopupService,
    private saldosContasBancariaService: SaldosContasBancariaService
  ) { 
    this.carregarPerfil = new CarregarPerfil();
  }

  ngOnInit(): void {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }

    this.contasBancariaService.getAllComboByInstituicaoLogada()
    .subscribe((contasBancarias: ContasBancaria[]) => {
      this.contasBancarias = contasBancarias;
    });

    this.limpar();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.saldoContaBancaria = null;

    this.carregarMovimentosInconsistentes();
  
  }

  private carregarMovimentosInconsistentes(){
    this.conciliacaoService.getAllInconsistentes()
    .subscribe((inconsistentes: Conciliacao[]) => {
      this.inconsistentes = inconsistentes;
    });
  }

  carregar() {
    this.conciliacaoService.carregar(this.filtro.dataInicio, 
                                     this.filtro.dataFim, 
                                     this.filtro.contaBancaria.id)
    .subscribe((conciliacoes: Conciliacao[]) => {
      this.conciliacoes = conciliacoes;
      this.dataSource.data = conciliacoes ? conciliacoes : [];
      this.verificaMostrarTabela(conciliacoes);

      this.masterToggle();
      this.carregarMovimentosInconsistentes();
    })
  }


  buscar() {
    this.selection.clear();
    
    this.conciliacaoService.getFilter(this.filtro.dataInicio, 
                                      this.filtro.dataFim, 
                                      this.filtro.contaBancaria.id)
    .subscribe((conciliacoes: Conciliacao[]) => {
      this.conciliacoes = conciliacoes;
      this.dataSource.data = conciliacoes ? conciliacoes : [];
      this.verificaMostrarTabela(conciliacoes);
    })
  }

  verificaMostrarTabela(lista: Conciliacao[]) {
    if (!lista || lista.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma conciliação bancária encontrada."
    } else {
      this.mostrarTabela = true;
    }
  }

  public handlePageBottom(event: PageEvent) {
    this.paginator.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.page.emit(event);
  }

  limpar() {
    this.mostrarTabela = false;
    this.dataSource.data = [];
    this.filtro = new Filter();
    this.filtro.contaBancaria  = new ContasBancaria();
    this.conciliacoes = [];
    this.selection.clear();
  }


  exportar() {
    if(this.selection.selected && this.selection.selected.length === 0) {
      this.toastService.showAlerta('Selecione os movimentos que deseja enviar para conciliação.');
      return;
    }

    this.chamaCaixaDialogoExportar();
  }

  isRegistroDivergente(c: Conciliacao): boolean {
    return !c.fornecedor && !c.semDocumento;
  }


  chamaCaixaDialogoExportar() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja exportar ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        if(this.selection.selected && this.selection.selected.length > 0) {
          const fornecedoresSemDocumento=  this.selection.selected.filter(c => this.isRegistroDivergente(c));
          if(fornecedoresSemDocumento.length > 0) {
            this.toastService.showAlerta('Não é possível exportar, pois existem fornecedores sem documentos.')
          } else {

            this.loadingPopupService.mostrarMensagemDialog('Gerando arquivo para conciliação bancária, aguarde...');
            this.conciliacaoService.gerarArquivo(this.selection.selected)
            .subscribe((dados: any) => {
              this.fileUtils.downloadFile(dados, "conciliacao.xlsx");
  
              this.buscar();
              this.toastService.showSucesso('Conciliação bancária exportada com sucesso!');
              this.loadingPopupService.closeDialog();
            }, 
            (error) => {
              this.loadingPopupService.closeDialog();
              console.log(error);            
            })
          }
        }
      } else {
        dialogRef.close();
      }
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


  showConciliacaoDivergencia() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      dados: this.inconsistentes.map(i => i.data),
      titulo: 'Conciliações Inconsistentes'
    };
    dialogConfig.panelClass = 'alturaDialogMovimentosInconsistentes';

    this.dialog.open(MovimentosBancariosInconsistentesComponent, dialogConfig);     
  }

  onInput(event) {
    this.dataUtilService.onMascaraDataInput(event);
  }


  getSaldosContasBancaria() {
    if(this.filtro.contaBancaria.id && this.filtro.dataInicio && this.filtro.dataFim) {
      this.saldosContasBancariaService.getSaldoContaBancaria(this.filtro.contaBancaria.id,
                                                             this.filtro.dataInicio, 
                                                             this.filtro.dataFim)
      .subscribe((saldo: any) => {
        this.saldoContaBancaria = new SaldoContaBancaria();
        this.saldoContaBancaria.saldoInicial = saldo?.saldoInicial | 0;
        this.saldoContaBancaria.saldoFinal   = saldo?.saldoFinal | 0;
      });
    } else {
      this.saldoContaBancaria;
    }
  }
}
