import { SaldosContasBancariaDialogComponent } from './saldos-contas-bancaria-dialog/saldos-contas-bancaria-dialog.component';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { ContasBancariaService } from './../../services/contas-bancaria/contas-bancaria.service';
import { SaldosContasBancaria } from './../../core/saldos-contas-bancaria';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { Banco } from 'src/app/core/banco';
import { ExtratoContaBancariaService } from 'src/app/services/extrato/extrato-conta-bancaria.service';
import { Extrato } from 'src/app/core/extrato';
import { ActivatedRoute } from '@angular/router';


class DadosBanco {
  banco: Banco;
  numeroAgencia: string;
  numeroContaBancaria: string;
}
class Filter {
  idContaBancaria: number;
  tipoContaBancaria: string;
  dadosBanco: DadosBanco;
  dataInicio: Date;
  dataFim: Date;
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
  extrato: Extrato;

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
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private contasBancariaService: ContasBancariaService,
    private extratoContaBancariaService: ExtratoContaBancariaService
  ) {
    this.carregarPerfil = new CarregarPerfil();
  }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);
    this.dataSource.paginator = this.paginator;

    this.contasBancariaService.getAll().subscribe((contas: ContasBancaria[]) => {
      this.contasBancarias = contas;
    });

    this.filter = new Filter();
    this.filter.dadosBanco = new DadosBanco();
    this.filter.dadosBanco.banco = new Banco();

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
    this.gerarExtrato();
    /*
    if (this.filter.tipoContaBancaria ||
        this.filter.dadosBanco.banco.nome ||
        this.filter.dadosBanco.numeroAgencia ||
        this.filter.dadosBanco.numeroContaBancaria ||
        this.filter.dataInicio ||
        this.filter.dataFim) {

      this.saldosContasBancariaService.getFilter(this.filter.tipoContaBancaria,
                                                 this.filter.dadosBanco.banco.nome,
                                                 this.filter.dadosBanco.numeroAgencia,
                                                 this.filter.dadosBanco.numeroContaBancaria,
                                                 this.filter.dataInicio,
                                                 this.filter.dataFim)
      .subscribe((saldos: SaldosContasBancaria[]) => {
        this.saldos = saldos;
        this.dataSource.data = saldos ? saldos : [];
        this.verificaMostrarTabela(saldos);
      });
    }
    */
  }

  gerarExtrato() {
    this.extratoContaBancariaService.gerarExtrato(this.filter.idContaBancaria, this.filter.dataInicio,this.filter.dataFim).subscribe((extrato: Extrato) => {
      this.extrato = extrato;
      this.visualizar();
    });
  }

  visualizar() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {extrato: this.extrato};
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

  filtrarContasPorTipo() {
    if (this.filter.tipoContaBancaria) {
      const distinct = (value, index, self) => self.indexOf(value) === index;
      this.bancos = this.contasBancarias.filter(c => c.tipoContaBancaria === this.filter.tipoContaBancaria)
                                         .map(c => JSON.parse(JSON.stringify({idConta: c.id,
                                                                              banco: c.banco,
                                                                              numeroAgencia: c.numeroAgencia,
                                                                              numeroContaBancaria: c.numeroContaBancaria})))
                          .filter(distinct);

    }
  }
 
}
