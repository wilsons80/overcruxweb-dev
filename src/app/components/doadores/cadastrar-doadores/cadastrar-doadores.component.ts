import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Doadores } from 'src/app/core/doadores';
import { Empresa } from 'src/app/core/empresa';
import { FilterEmpresa } from 'src/app/core/filter-empresa';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { TiposDoadores } from 'src/app/core/tipos-doadores';
import { DoadoresService } from 'src/app/services/doadores/doadores.service';
import { TiposDoadoresService } from 'src/app/services/tipos-doadores/tipos-doadores.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FilterPessoaFisica } from './../../../core/filter-pessoa-fisica';
import { EmpresaService } from './../../../services/empresa/empresa.service';
import { PessoaFisicaService } from './../../../services/pessoa-fisica/pessoa-fisica.service';

@Component({
  selector: 'cadastrar-doadores',
  templateUrl: './cadastrar-doadores.component.html',
  styleUrls: ['./cadastrar-doadores.component.css']
})
export class CadastrarDoadoresComponent implements OnInit {


  doadores: Doadores;
  listaTiposDoadores: TiposDoadores[];
  filtroPessoa: FilterPessoaFisica;
  filtroEmpresa: FilterEmpresa;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;
  comboPF: any[];
  listaEmpresas: Empresa[];

  constructor(
    private doadoresService: DoadoresService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private tiposDoadoresService: TiposDoadoresService,
    private pessoaFisicaService: PessoaFisicaService,
    private empresaService: EmpresaService
  ) {

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
      this.doadoresService.getById(id).subscribe((doadores: Doadores) => {
        this.doadores = doadores;
        this.filtroPessoa.pessoaFisica.id = this.doadores.pessoasFisica.id;
        this.filtroEmpresa.empresa.id = this.doadores.empresa.id;

      });
    }

    this.tiposDoadoresService.getAll().subscribe((tiposDoadores: TiposDoadores[]) => {
      this.listaTiposDoadores = tiposDoadores;
    });

    this.empresaService.getAllCombo().subscribe((empresas: Empresa[]) => {
      this.listaEmpresas = empresas;
    });

  }

  inicializarObjetos() {
    this.doadores = new Doadores();
    this.doadores.empresa = new Empresa();
    this.doadores.pessoasFisica = new PessoaFisica();
    this.doadores.tipoDoador = new TiposDoadores;
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
    this.doadoresService.cadastrar(this.doadores).subscribe(() => {
      this.toastService.showSucesso("Cadastro realizado com sucesso");
      this.router.navigate(['doadores']);
    });
  }


  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['doadores']);
  }

  atualizar() {

    this.doadoresService.alterar(this.doadores).subscribe(() => {
      this.toastService.showSucesso("Registro atualizado com sucesso");
    });

  }


  onValorChangeEmpresa(registro: any) {
    this.filtroPessoa = registro;
    if (registro) {
      this.mostrarDadosEmpresa(registro.id);
    }
  }

  mostrarDadosEmpresa(id: number) {
    this.empresaService.getById(id).subscribe((empresa: Empresa) => {
      this.doadores.empresa = empresa;
    })
  }

  onValorChangePessoa(registro: any) {
    this.filtroPessoa = registro;
    if (registro) {
      this.mostrarDadosPessoa(registro.id);
    }
  }

  mostrarDadosPessoa(id: number) {
    this.pessoaFisicaService.getById(id).subscribe((pessoa: PessoaFisica) => {
      this.doadores.pessoasFisica = pessoa;
    })
  }

}
