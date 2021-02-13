import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Unidade } from 'src/app/core/unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { Departamento } from './../../../core/departamento';
import { DepartamentoService } from './../../../services/departamento/departamento.service';
import { ToastService } from './../../../services/toast/toast.service';
import * as _ from 'lodash';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-cadastrar-departamento',
  templateUrl: './cadastrar-departamento.component.html',
  styleUrls: ['./cadastrar-departamento.component.css']
})
export class CadastrarDepartamentoComponent implements OnInit {

  unidades: Unidade[];
  departamentos: Departamento[];
  departamento: Departamento;

  isAtualizar: boolean = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();
  
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCelular = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private unidadeService: UnidadeService,
    private departamentoService: DepartamentoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
  }


  ngOnInit() {
    this.inicializarObjetos();

    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }
    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: Unidade[]) => {
      this.unidades = unidades;
    })

    this.departamentoService.getAll().subscribe((departamentos: Departamento[]) => {
      this.departamentos = departamentos;
    })

    let idDepartamento: number;
    idDepartamento = this.activatedRoute.snapshot.queryParams.idDepartamento ? this.activatedRoute.snapshot.queryParams.idDepartamento : null;
    if (idDepartamento) {
      this.isAtualizar = true;
      this.departamentoService.getById(idDepartamento).subscribe((departamento: Departamento) => {
        this.departamento = departamento
      });
    }

  }
  inicializarObjetos() {
    this.departamento = new Departamento();
    this.departamento.unidade = new Unidade();
    this.departamento.departamentoSuperior = new Departamento();
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }
  cadastrar() {
    this.departamentoService.cadastrar(this.departamento).subscribe(() => {
      this.router.navigate(['departamento']);
      this.toastService.showSucesso("Departamento cadastrado com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['departamento']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.departamentoService.alterar(this.departamento).subscribe(() => {
      this.router.navigate(['departamento']);
      this.toastService.showSucesso("Departamento atualizado com sucesso");
    });

  }

  mostrarUnidade(idUnidade: number) {
    this.departamento.unidade = _.cloneDeep(_.find(this.unidades, (u: Unidade) => u.idUnidade === idUnidade));
  }
 
  mostrarDepartamento(idDepartamento: number) {
    this.departamento.departamentoSuperior = _.cloneDeep(_.find(this.departamentos, (d: Departamento) => d.idDepartamento === idDepartamento));
  }

}
