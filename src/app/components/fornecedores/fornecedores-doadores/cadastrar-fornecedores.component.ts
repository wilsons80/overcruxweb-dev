import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { Fornecedor } from 'src/app/core/fornecedor';
import { Empresa } from 'src/app/core/empresa';
import { FilterEmpresa } from 'src/app/core/filter-empresa';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FilterPessoaFisica } from '../../../core/filter-pessoa-fisica';
import { EmpresaService } from '../../../services/empresa/empresa.service';
import { PessoaFisicaService } from '../../../services/pessoa-fisica/pessoa-fisica.service';
import { Input } from '@angular/core';
import { FornecedoresService } from 'src/app/services/fornecedores/fornecedores.service';

@Component({
  selector: 'cadastrar-fornecedores',
  templateUrl: './cadastrar-fornecedores.component.html',
  styleUrls: ['./cadastrar-fornecedores.component.css']
})
export class CadastrarFornecedoresComponent implements OnInit {

  @Input() tiposEmpresas:any[];

  fornecedor: Fornecedor;
  filtroPessoa: FilterPessoaFisica;
  filtroEmpresa: FilterEmpresa;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;
  comboPF: any[];
  listaEmpresas: Empresa[];

  constructor(
    private fornecedoresService: FornecedoresService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private pessoaFisicaService: PessoaFisicaService,
    private empresaService: EmpresaService,
    private dataUtilService: DataUtilService,
    private cd: ChangeDetectorRef
  ) {
  }
 
 
  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  ngOnInit() {

    this.inicializarObjetos()

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.fornecedoresService.getById(id).subscribe((Fornecedores: Fornecedor) => {
        this.fornecedor = Fornecedores;
        this.filtroPessoa.pessoaFisica.id = this.fornecedor.pessoasFisica.id;
        this.filtroEmpresa.empresa.id = this.fornecedor.empresa.id;

      });
    }


    this.empresaService.getAllCombo().subscribe((empresas: Empresa[]) => {
      this.listaEmpresas = empresas;
    });

  }

  inicializarObjetos() {
    this.fornecedor = new Fornecedor();
    this.fornecedor.empresa = new Empresa();
    this.fornecedor.pessoasFisica = new PessoaFisica();
    this.filtroPessoa = new FilterPessoaFisica();
    this.filtroPessoa.pessoaFisica = new PessoaFisica();
    this.filtroEmpresa = new FilterEmpresa();
    this.filtroEmpresa.empresa = new Empresa();
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.fornecedoresService.cadastrar(this.fornecedor).subscribe(() => {
      this.toastService.showSucesso("Cadastro realizado com sucesso");
      this.router.navigate(['fornecedor']);
    });
  }


  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['fornecedor']);
  }

  atualizar() {

    this.fornecedoresService.alterar(this.fornecedor).subscribe(() => {
      this.toastService.showSucesso("Registro atualizado com sucesso");
    });

  }


  onValorChangeEmpresa(registro: any) {
    this.filtroEmpresa = registro;
    if (registro) {
      this.mostrarDadosEmpresa(registro.id);
    }
  }

  mostrarDadosEmpresa(id: number) {
    this.fornecedor.empresa = _.find(this.listaEmpresas, { id: id });
  }

  onValorChangePessoa(registro: any) {
    this.filtroPessoa = registro;
    if (registro) {
      this.mostrarDadosPessoa(registro.id);
    }
  }

  mostrarDadosPessoa(id: number) {
    this.pessoaFisicaService.getById(id).subscribe((pessoa: PessoaFisica) => {
      this.fornecedor.pessoasFisica = pessoa;
    })
  }

  onMascaraDataInput(event) {
    return this.dataUtilService.onMascaraDataInput(event);
  }
  
  isObrigatorio(elm:any){
    if(elm == null || elm.id == null) return true;
    return false;
  }

  
}
