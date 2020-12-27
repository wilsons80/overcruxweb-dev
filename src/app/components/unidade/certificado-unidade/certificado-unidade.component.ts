import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { CertificadoUnidade } from 'src/app/core/certificado-unidade';

@Component({
  selector: 'certificado-unidade',
  templateUrl: './certificado-unidade.component.html',
  styleUrls: ['./certificado-unidade.component.css']
})
export class CertificadoUnidadeComponent implements OnInit {

  @Input() listaCertificadoUnidade: CertificadoUnidade[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string = "Nenhum certificado adicionado";

  displayedColumns: string[] = ['codigo', 'descricao','dataInicio','dataFim', 'acoes'];
  dataSource: MatTableDataSource<CertificadoUnidade> = new MatTableDataSource();

  certificadoUnidade: CertificadoUnidade;

  perfilAcesso: Acesso;

  openFormCadastro = false;
  isAtualizar = false;


  constructor(


  ) { }

  ngOnInit() {
    this.initObjetos();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["listaCertificadoUnidade"] && changes["listaCertificadoUnidade"].currentValue) {
      this.carregarLista();
    }
  }

  adicionar() {
    const certificadoSelecionada = new CertificadoUnidade();
    Object.assign(certificadoSelecionada, this.certificadoUnidade);


    this.listaCertificadoUnidade.push(certificadoSelecionada);
    this.limpar();
    this.openFormCadastro = !this.openFormCadastro;
  }


  novo() {
    this.isAtualizar = false;
    this.openFormCadastro = !this.openFormCadastro;
    this.limpar();
  }

  atualizar() {
    this.limpar();
    this.openFormCadastro = false;
    this.isAtualizar = false;
  }



  atualizarFuncao(certificadoUnidade: CertificadoUnidade) {
    this.certificadoUnidade = certificadoUnidade;
    this.openFormCadastro = true;
    this.isAtualizar = true;

  }

  limpar() {
    this.initObjetos();
  }

  carregarLista() {
    if (this.listaCertificadoUnidade.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum certificado adicionado.';
    } else {
      this.dataSource.data = this.listaCertificadoUnidade ? this.listaCertificadoUnidade : [];
      this.mostrarTabela = true;
    }
  }


  initObjetos() {
    this.certificadoUnidade = new CertificadoUnidade();
  }

  deletar(certificadoUnidade: CertificadoUnidade): void {
    const index = this.listaCertificadoUnidade.indexOf(this.listaCertificadoUnidade.find(fi => fi === certificadoUnidade));
    if (index >= 0) {
      this.listaCertificadoUnidade.splice(index, 1);
      this.carregarLista();
    }
  }

  atualizarCentrosDeCusto(certificadoUnidade: CertificadoUnidade) {
    this.certificadoUnidade = certificadoUnidade;
    this.openFormCadastro = true;
    this.isAtualizar = true;

  }

}
