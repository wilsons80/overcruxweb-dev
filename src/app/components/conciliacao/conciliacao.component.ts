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

class Filter {
  contaBancaria: ContasBancaria;
  dataInicio: Date;
  dataFim: Date;
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
  
  displayedColumns: string[] = ['select','codigo', 'tipo', 'situacao', 'documento', 'dataConciliacao', 'banco',  'categoria', 'fornecedor', 'complemento', 'centroCusto', 'grupoContas', 'valor'];
  dataSource: MatTableDataSource<Conciliacao> = new MatTableDataSource();
  mostrarTabela: boolean = false;
  msg: string;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  constructor(
    private conciliacaoService: ConciliacaoService,
    private contasBancariaService: ContasBancariaService,
    private toastService: ToastService,
    private dataUtilService: DataUtilService,
    private router: Router,
    private fileUtils: FileUtils,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
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
    })
  }


  buscar() {
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
    this.conciliacoes = []
  }


  exportar() {
    if(this.selection.selected && this.selection.selected.length === 0) {
      this.toastService.showAlerta('Selecione os movimentos que deseja enviar para conciliação.');
      return;
    }

    this.chamaCaixaDialogoExportar();
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
          const fornecedoresSemDocumento=  this.selection.selected.filter(c => !c.fornecedor && !c.semDocumento);
          if(fornecedoresSemDocumento) {
            this.toastService.showAlerta('Não é possível exportar, pois existem fornecedores sem documentos.')
          } else {
            this.conciliacaoService.gerarArquivo(this.selection.selected).subscribe((dados: any) => {
              this.fileUtils.downloadFile(dados);
  
              this.buscar();
              this.toastService.showSucesso('Conciliação bancária exportada com sucesso!');
            }, (error) => {
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
    console.log('showConciliacaoDivergencia');
    
  }

  onInput(event) {
    this.dataUtilService.onMascaraDataInput(event);
  }

}
