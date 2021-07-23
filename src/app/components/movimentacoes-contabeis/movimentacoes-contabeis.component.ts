import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { CategoriasContabeisService } from 'src/app/services/categorias-contabeis/categorias-contabeis.service';
import { PlanosContas } from 'src/app/core/planos-contas';
import * as _ from 'lodash';
import { MovimentacoesContabeis } from 'src/app/core/movimentacoes-contabeis';
import { MovimentacoesContabeisService } from 'src/app/services/movimentacoes-contabeis/movimentacoes-contabeis.service';
import { MovimentacoesContabeisDto } from 'src/app/core/movimentacoes-contabeis-dto';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { ComboProjeto } from 'src/app/core/combo-projeto';
import { ComboPrograma } from 'src/app/core/combo-programa';

export class Filter{
	dataInicio: Date;
  dataFim: Date;
  valor: number;
  programa: ComboPrograma;
  projeto: ComboProjeto;
  contaDestino: any;
  contaOrigem: any;
}

@Component({
  selector: 'movimentacoes-contabeis',
  templateUrl: './movimentacoes-contabeis.component.html',
  styleUrls: ['./movimentacoes-contabeis.component.css']
})
export class MovimentacoesContabeisComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  movimentacoesContabeis: MovimentacoesContabeis[];

  filtro: Filter = new Filter();

  msg: string;  
  mostrarTabela: boolean = false;
  displayedColumns: string[] = ['data', 'valor', 'programaprojeto01','contacontabil01','acoes'];
  dataSource: MatTableDataSource<MovimentacoesContabeisDto> = new MatTableDataSource();
  
  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();
  

  constructor(
    private movimentacoesContabiesService: MovimentacoesContabeisService,
    private dataUtilService: DataUtilService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.filtro = new Filter();    
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);
    this.dataSource.paginator = this.paginator;
    this.consultar();
  }


  limpar() {
    this.mostrarTabela = false;
    this.filtro = new Filter();  
    this.dataSource.data = [];
  }

  consultar() {    
      this.movimentacoesContabiesService.getFilter(this.filtro.programa?.id, 
                                                   this.filtro.projeto?.id, 
                                                   this.filtro.valor, 
                                                   this.filtro.dataInicio, 
                                                   this.filtro.dataFim, 
                                                   this.filtro.contaDestino?.id, 
                                                   this.filtro.contaOrigem?.id)
      .subscribe((lista: MovimentacoesContabeisDto[]) => {
        if (!lista) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada.';
        } else {
          this.dataSource.data = lista ? lista : [];
          this.mostrarTabela = true;
        }
      },
      (retorno) => {
          this.mostrarTabela = false
          this.msg = retorno.error.mensagem
      });
   
  }


  atualizar(movimentacaoContabil: MovimentacoesContabeisDto) {
    this.router.navigate(['/movimentacoescontabeis/cadastrar'], { queryParams: { id: movimentacaoContabil.id } });
  }

  deletar(movimentacaoContabil: MovimentacoesContabeisDto) {
    this.chamaCaixaDialogo(movimentacaoContabil);
  }

  chamaCaixaDialogo(movimentacaoContabil: MovimentacoesContabeisDto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.movimentacoesContabiesService.excluir(movimentacaoContabil.id).subscribe(() => {
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

  verificaMostrarTabela(movimentacoesContabeis: MovimentacoesContabeisDto[]) {
    if (!movimentacoesContabeis || movimentacoesContabeis.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma movimentação contábil cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }


  getDescricaoProgramaProjeto01(registro: MovimentacoesContabeisDto){
    return registro.nomePrograma01 || registro.nomeProjeto01;
  }
  getDescricaoProgramaProjeto02(registro: MovimentacoesContabeisDto){
    return registro.nomePrograma02 || registro.nomeProjeto02;
  }

  onMascaraDataInput(event) {
    return this.dataUtilService.onMascaraDataInput(event);
  }

  onValorChangePrograma(event: any) {
    this.filtro.programa = event;
  }

  onValorChangeProjeto(event: any) {
    this.filtro.projeto = event;
  }

  onValorChangeContaDestino(event: any) {
    this.filtro.contaDestino = event;
  }

  onValorChangeContaOrigem(event: any) {
    this.filtro.contaOrigem = event;
  }

  

}
