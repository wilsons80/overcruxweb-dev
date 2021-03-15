import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { Movimentacoes } from 'src/app/core/movimentacoes';
import { TransferenciaValores } from 'src/app/core/transferencia-valores';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { ContasBancariaService } from 'src/app/services/contas-bancaria/contas-bancaria.service';
import { MovimentacoesService } from 'src/app/services/movimentacoes/movimentacoes.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';



export class Filtro{
  contaBancariaOrigem: ContasBancaria  = new ContasBancaria();
  contaBancariaDestino: ContasBancaria = new ContasBancaria();
  dataTransferencia: Date;
  valor: number;
}



@Component({
  selector: 'transferencia-valores',
  templateUrl: './transferencia-valores.component.html',
  styleUrls: ['./transferencia-valores.component.css']
})
export class TransferenciaValoresComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  listaMovimentacoes: Movimentacoes[];
  mostrarTabela: boolean = false;
  msg: string;

  comboContasBancarias: ContasBancaria[];
  

  displayedColumns: string[] = ['origem', 'destino', 'dataDocumento', 'valorMovimentacao', 'acoes'];
  dataSource: MatTableDataSource<TransferenciaValores> = new MatTableDataSource();
  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;


  filtro: Filtro = new Filtro();

  constructor(
    private dataUtilService: DataUtilService,
    private movimentacoesService: MovimentacoesService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private contasBancariaService: ContasBancariaService,
  ) { 
    this.carregarPerfil = new CarregarPerfil();
  }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.carregarCombos();
  }



  carregarCombos(){
    this.contasBancariaService.getAllComboByInstituicaoLogada().subscribe((contasBancarias: ContasBancaria[]) => {
      this.comboContasBancarias = contasBancarias;
      this.comboContasBancarias.forEach(c => {
        c.descricaoCompleta = `Banco: ${c.banco.numero} - ${c.banco.nome} - Agência: ${c.numeroAgencia} - Conta: ${c.numeroContaBancaria}`;
      })
    });
  }


  limpar() {
    this.mostrarTabela = false;
    this.dataSource.data = [];

    this.filtro = new Filtro();
    this.filtro.contaBancariaOrigem = new ContasBancaria();
    this.filtro.contaBancariaDestino = new ContasBancaria();
  }

  consultar() {

    if(this.filtro.contaBancariaOrigem?.id && this.filtro.contaBancariaDestino?.id 
        && this.filtro.contaBancariaOrigem.id === this.filtro.contaBancariaDestino.id) {
      this.toastService.showAlerta('A conta bancária de origem não pode ser a mesma da conta bancário de destino.');
      return;
    }

    this.movimentacoesService.getFilterTransferenciaValores(this.filtro.contaBancariaOrigem?.id, 
                                                            this.filtro.contaBancariaDestino?.id, 
                                                            this.filtro.valor, 
                                                            this.filtro.dataTransferencia)
    .subscribe((movimentacoes: TransferenciaValores[]) => {
      if (!movimentacoes) {
        this.mostrarTabela = false
        this.msg = "Nenhum registro para a pesquisa selecionada"
      } else {
        this.dataSource.data = movimentacoes;
        this.dataSource.sort = this.sort;
        this.mostrarTabela = true;
      }
    })
  }


  atualizar(movimentacoes: TransferenciaValores) {
    this.router.navigate(['/transferenciavalores/cadastrar'], { queryParams: { id: movimentacoes.idMovimentacao } });
  }

  deletar(movimentacoes: TransferenciaValores) {
    this.chamaCaixaDialogo(movimentacoes);
  }

  chamaCaixaDialogo(movimentacoes: TransferenciaValores) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.movimentacoesService.excluir(movimentacoes.idMovimentacao).subscribe(() => {
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  verificaMostrarTabela(listaMovimentacoes: Movimentacoes[]) {
    if (!listaMovimentacoes || listaMovimentacoes.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma transferência cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }

  
  onMascaraDataInput(event) {
    return this.dataUtilService.onMascaraDataInput(event);
  }

}
