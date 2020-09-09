import { MovimentacoesService } from './../../services/movimentacoes/movimentacoes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
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
import { DataUtilService } from 'src/app/services/commons/data-util.service';

class Filter {
  empresa: Empresa;
  programa: Programa;
  projeto: Projeto;
  valor: number;
  dataInicioDoc: Date;
  dataFimDoc: Date;
  dataVencimento: Date;
}

@Component({
  selector: 'movimentacoes',
  templateUrl: './movimentacoes.component.html',
  styleUrls: ['./movimentacoes.component.css']
})
export class MovimentacoesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaMovimentacoes: Movimentacoes[];
  mostrarTabela: boolean = false;
  movimentacoes: Movimentacoes = new Movimentacoes();
  msg: string;

  empresas:Empresa[];
  projetos:Projeto[];
  programas:Programa[];

  filtro = new Filter();

  displayedColumns: string[] = ['programaprojeto', 'empresa','tipoMovimento', 'dataDocumento', 'valorMovimentacao', 'nrDocumento', 'acoes'];
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
    private dataUtilService: DataUtilService
  ) { }

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

    this.limpar();
    this.dataSource.paginator = this.paginator;
    this.getAllOrigem();
  }


  limpar() {
    this.mostrarTabela = false;
    this.movimentacoes = new Movimentacoes()
    this.dataSource.data = [];
    this.filtro = new Filter();
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
                                              this.filtro.dataVencimento)
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


}
