import { SaldosContasBancariaDialogComponent } from './saldos-contas-bancaria-dialog/saldos-contas-bancaria-dialog.component';
import { SaldosContasBancariaService } from './../../services/saldos-contas-bancaria/saldos-contas-bancaria.service';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { ContasBancariaService } from './../../services/contas-bancaria/contas-bancaria.service';
import { SaldosContasBancaria } from './../../core/saldos-contas-bancaria';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { Router, ActivatedRoute } from '@angular/router';
import { Banco } from 'src/app/core/banco';


class DadosBanco {
  banco: Banco;
  numeroAgencia: string;
  numeroContaBancaria: string;
}
class Filter {
  tipoContaBancaria: string;
  dadosBanco: DadosBanco;
}


@Component({
  selector: 'saldos-contas-bancaria',
  templateUrl: './saldos-contas-bancaria.component.html',
  styleUrls: ['./saldos-contas-bancaria.component.css']
})
export class SaldosContasBancariaComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  tiposContas = [{
      tipo: 'C',
      descricao: 'CONTA CORRENTE'
    },
    {
      tipo: 'P',
      descricao: 'POUPANÇA'
  }];

  bancos = [];

  contasBancarias: ContasBancaria[];

  saldos: SaldosContasBancaria[];
  saldo: SaldosContasBancaria = new SaldosContasBancaria();
  msg: string;

  filter: Filter = new Filter();

  mostrarTabela = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil = new CarregarPerfil();

  displayedColumns: string[] = ['tipoconta', 'banco', 'agencia', 'numeroconta', 'saldo', 'datasaldo', 'acoes'];
  dataSource: MatTableDataSource<SaldosContasBancaria> = new MatTableDataSource();

  constructor(
    private saldosContasBancariaService: SaldosContasBancariaService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private contasBancariaService: ContasBancariaService,
  ) {
    this.carregarPerfil = new CarregarPerfil();
  }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);
    this.dataSource.paginator = this.paginator;

    this.contasBancariaService.getAll().subscribe((contas: ContasBancaria[]) => {
      this.contasBancarias = contas;

      const distinct = (value, index, self) => self.indexOf(value) === index;
      this.bancos = contas.map(c => JSON.parse(JSON.stringify({banco: c.banco,
                                                    numeroAgencia: c.numeroAgencia,
                                                    numeroContaBancaria: c.numeroContaBancaria})))
                          .filter(distinct);
    });

    this.filter = new Filter();
    this.filter.dadosBanco = new DadosBanco();
    this.filter.dadosBanco.banco = new Banco();

    this.consultar();
  }


  limpar() {
    this.mostrarTabela = false;
    this.saldo = new SaldosContasBancaria();
    this.dataSource.data = [];
    this.filter = new Filter();
    this.filter.dadosBanco = new DadosBanco();
    this.filter.dadosBanco.banco = new Banco();
  }

  consultar() {

    if (this.filter.tipoContaBancaria ||
        this.filter.dadosBanco.banco.nome ||
        this.filter.dadosBanco.numeroAgencia ||
        this.filter.dadosBanco.numeroContaBancaria) {

      this.saldosContasBancariaService.getFilter(this.filter.tipoContaBancaria,
                                                 this.filter.dadosBanco.banco.nome,
                                                 this.filter.dadosBanco.numeroAgencia,
                                                 this.filter.dadosBanco.numeroContaBancaria)
      .subscribe((saldos: SaldosContasBancaria[]) => {
        this.saldos = saldos;
        this.dataSource.data = saldos ? saldos : [];
        this.verificaMostrarTabela(saldos);
      });
    }
  }


  visualizar(saldo: SaldosContasBancaria) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {saldoContaBancaria: saldo};
    this.dialog.open(SaldosContasBancariaDialogComponent, dialogConfig);
  }


  verificaMostrarTabela(saldos: SaldosContasBancaria[]) {
    if (!saldos || saldos.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum saldo de conta bancária cadastrada.';
    } else {
      this.mostrarTabela = true;
    }
  }

 
}
