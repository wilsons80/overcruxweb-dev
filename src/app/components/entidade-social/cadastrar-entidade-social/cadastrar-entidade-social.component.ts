import { EntidadeSocialService } from './../../../services/entidade-social/entidade-social.service';
import { Component, OnInit } from '@angular/core';
import { Acesso } from 'src/app/core/acesso';
import { CategoriaEmpresa } from 'src/app/core/categoria-empresa';
import { TipoEmpresa } from 'src/app/core/tipo-empresa';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast/toast.service';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';
import { EntidadesSociais } from 'src/app/core/entidades-sociais';
import { Empresa } from 'src/app/core/empresa';

@Component({
  selector: 'app-cadastrar-entidade-social',
  templateUrl: './cadastrar-entidade-social.component.html',
  styleUrls: ['./cadastrar-entidade-social.component.css']
})
export class CadastrarEntidadeSocialComponent implements OnInit {

  categoriaEmpresa: CategoriaEmpresa;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  categoriasEmpresa: any [] = [
    {id: CategoriaEmpresa.COMERCIAL, descricao: 'COMERCIAL'},
    {id: CategoriaEmpresa.INDUSTRIAS, descricao: 'INDUSTRIAS'},
    {id: CategoriaEmpresa.PRESTADOR_SERVICO, descricao: 'PRESTADOR DE SERVIÇOS'},
    {id: CategoriaEmpresa.OUTRO, descricao: 'OUTRO'},
  ];

  
  tiposEmpresa: any [] = [
    {tipo: TipoEmpresa.PARCEIRA, descricao: 'PARCEIRA'},
    {tipo: TipoEmpresa.CONVENIO, descricao: 'CONVÊNIO'},
    {tipo: TipoEmpresa.CONTRATO, descricao: 'CONTRATO'},
    {tipo: TipoEmpresa.FORNECEDOR, descricao: 'FORNECEDOR'},
    {tipo: TipoEmpresa.CLIENTE, descricao: 'CLIENTE'},
    {tipo: TipoEmpresa.OUTRO, descricao: 'OUTRO'}
  ]

  ufs: any[] = [
    {nome: 'DF'}
  ]

  public maskCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public maskCNPJ = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public maskPhone   = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCelular = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  entidadeSocial: EntidadesSociais = new EntidadesSociais();

  isAtualizar = false;

  constructor(
    private entidadeSocialService: EntidadeSocialService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
    private enderecoService: EnderecoService
  ) { }


  ngOnInit() {
    this.entidadeSocial.empresa = new Empresa();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }


    this.enderecoService.getAllEstados().subscribe((ufs:any)=> {
      this.ufs = ufs;
    });

    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.entidadeSocialService.getById(id).subscribe((entidadeSocial: EntidadesSociais) => {
        this.entidadeSocial = entidadeSocial;
      });
    }
  }

  mostrarBotaoLimpar(){
    if (this.isAtualizar) { return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }

  cadastrar() {
    this.tratarDados();

    this.entidadeSocialService.cadastrar(this.entidadeSocial).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Entidade social cadastrada com sucesso');
    });
  }

  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }

  limpar() {
    this.entidadeSocial = new EntidadesSociais();
    this.entidadeSocial.empresa = new Empresa();
   }

  cancelar() {
    this.location.back();
  }


  atualizar() {

    this.tratarDados();

    this.entidadeSocialService.alterar(this.entidadeSocial).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Entidade social atualizada com sucesso');
    });

  }

  tratarDados(){
    this.entidadeSocial.empresa.cep = this.entidadeSocial.empresa.cep ? this.retiraMascara( this.entidadeSocial.empresa.cep.toString()) : null ;
    this.entidadeSocial.empresa.cnpj = this.entidadeSocial.empresa.cnpj ? this.retiraMascara(this.entidadeSocial.empresa.cnpj) : null ;
    this.entidadeSocial.empresa.telefone = this.entidadeSocial.empresa.telefone ? this.retiraMascara(this.entidadeSocial.empresa.telefone) : null ;
    this.entidadeSocial.empresa.ativa = this.entidadeSocial.empresa.ativa ? 'S' : 'N';
  }

}
