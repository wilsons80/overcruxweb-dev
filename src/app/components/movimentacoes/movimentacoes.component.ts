import { MovimentacoesService } from './../../services/movimentacoes/movimentacoes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Movimentacoes } from 'src/app/core/movimentacoes';
import { Empresa } from 'src/app/core/empresa';
import { Projeto } from 'src/app/core/projeto';
import { Programa } from 'src/app/core/programa';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FilterMovimentacoes } from 'src/app/core/filter-movimentacoes';
import { CnpjPipe } from 'src/app/pipes/cnpj.pipe';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';




@Component({
  selector: 'movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.css'],
  providers: [CnpjPipe, CpfPipe],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])]
})
export class MovimentacoesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    

  expandedElement: any;
  
  listaMovimentacoes: Movimentacoes[];
  mostrarTabela: boolean = false;
  movimentacoes: Movimentacoes = new Movimentacoes();
  msg: string;

  empresas:Empresa[];
  projetos:Projeto[];
  programas:Programa[];

  filtro: FilterMovimentacoes;

  displayedColumns: string[] = ['programaprojeto', 'fornecedorcredor', 'cnpjcpf', 
                                'recibo', 'dataDocumento',  'valor', 'nrtransacao', 
                                'dataUltimoPagamento', 'categorias', 'dataproximasfaturas',
                                'icones','acoes'];
  dataSource: MatTableDataSource<Movimentacoes> = new MatTableDataSource();
  
  perfilAcesso: Acesso;

  constructor(
    private movimentacoesService: MovimentacoesService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private empresaService: EmpresaService,
    private programaService: ProgramaService,
    private projetoService: ProjetoService,
    private dataUtilService: DataUtilService,   
    private toastService: ToastService,
    private cnpjPipe: CnpjPipe,
    private cpfPipe: CpfPipe 
  ) { 
    this.filtro = this.movimentacoesService.filtro;
  }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.empresaService.getAllCombo().subscribe((empresas:Empresa[]) => {
      this.empresas = empresas;
    })

    this.programaService.getAllCombo().subscribe((programas:Programa[]) => {
      this.programas = programas;
    })

    this.projetoService.getAllCombo().subscribe((projetos:Projeto[]) => {
      this.projetos = projetos;
    })

    this.dataSource.paginator = this.paginator;
   
    this.getAllOrigem();
  }


  public handlePageBottom(event: PageEvent) {
    this.paginator.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.page.emit(event);
}

  limpar() {
    this.mostrarTabela = false;
    this.movimentacoes = new Movimentacoes()
    this.dataSource.data = [];
    this.filtro = (this.movimentacoesService.filtro = new FilterMovimentacoes());
    this.filtro.empresa  = new Empresa();
    this.filtro.projeto  = new Projeto();
    this.filtro.programa = new Programa();
    this.filtro.valor    = 0;
  }

  consultar() {
    if (this.movimentacoes.id) {
      this.movimentacoesService.getById(this.movimentacoes.id).subscribe((movimentacoes: Movimentacoes) => {
        if (!movimentacoes) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [movimentacoes];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAllOrigem();
    }

  }

  atualizar(movimentacoes: Movimentacoes) {
    this.router.navigate(['/movimentacoes/cadastrar'], { queryParams: { id: movimentacoes.id } });
  }

  deletar(movimentacoes: Movimentacoes) {
    this.chamaCaixaDialogo(movimentacoes);
  }

  chamaCaixaDialogo(movimentacoes: Movimentacoes) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.movimentacoesService.excluir(movimentacoes.id).subscribe(() => {
          this.movimentacoes.id = null;
          this.consultar();
          this.toastService.showSucesso('Movimento excluído com sucesso.');
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  private initFiltro() {
    if(!this.filtro.empresa) {
      this.filtro.empresa  = new Empresa();
    }

    if(!this.filtro.programa) {
      this.filtro.programa = new Programa();
    }

    if(!this.filtro.projeto) {
      this.filtro.projeto  = new Projeto();
    }
  }

  getAllOrigem() {
    this.initFiltro();
    this.movimentacoesService.getFilterOrigem(this.filtro.empresa.id,
                                              this.filtro.programa.id,
                                              this.filtro.projeto.id,
                                              this.filtro.valor,
                                              this.filtro.dataInicioDoc,
                                              this.filtro.dataFimDoc,
                                              this.filtro.dataVencimento,
                                              this.filtro.dataInicioMov,
                                              this.filtro.dataFimMov,
                                              this.filtro.dataInicioPag,
                                              this.filtro.dataFimPag,                                              
                                              this.filtro.numeroDocumento
                                              )
    .subscribe((listaMovimentacoes: Movimentacoes[]) => {
      this.listaMovimentacoes = listaMovimentacoes;
      this.dataSource.data = listaMovimentacoes ? listaMovimentacoes : [];
      this.verificaMostrarTabela(listaMovimentacoes);
    })
  }

  verificaMostrarTabela(listaMovimentacoes: Movimentacoes[]) {
    if (!listaMovimentacoes || listaMovimentacoes.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma movimentação cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }


  getUltimoPagamento(movimento: Movimentacoes) {
    let pagamentos  = movimento.pagamentosFatura;

    // Ordenação de array (decrescente)
    pagamentos = pagamentos.sort((a,b) => {
      if (a.dataPagamento > b.dataPagamento) {return -1;}
      if (a.dataPagamento < b.dataPagamento) {return 1;}
      return 0;
    });

    const ultimoPagamento = pagamentos[0];
    return ultimoPagamento;
  }


  onMascaraDataInput(event) {
    return this.dataUtilService.onMascaraDataInput(event);
  }


  getFornecedorCredor(movimentacao: Movimentacoes): string {
    if(movimentacao.empresa && movimentacao.empresa.nomeRazaoSocial) {
      return movimentacao.empresa.nomeRazaoSocial.toUpperCase();
    }

    if(movimentacao.fornecedorColaborador && movimentacao.fornecedorColaborador.nome) {
      return movimentacao.fornecedorColaborador.nome.toUpperCase();
    }
    return '';
  }

  getCnpfCpf(movimentacao: Movimentacoes): string {
    if(movimentacao.empresa && movimentacao.empresa.cnpj) {
      return this.cnpjPipe.transform(movimentacao.empresa.cnpj);
    }

    if(movimentacao.fornecedorColaborador && movimentacao.fornecedorColaborador.cpf) {
      return this.cpfPipe.transform(movimentacao.fornecedorColaborador.cpf);
    }
    return '';
  }
}
