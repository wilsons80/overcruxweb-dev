import { TipoEmpresa } from './../../../core/tipo-empresa';
import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CategoriaEmpresa } from 'src/app/core/categoria-empresa';
import { Empresa } from 'src/app/core/empresa';
import { MetasService } from 'src/app/services/metas/metas.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Iniciativa } from 'src/app/core/iniciativa';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import * as _ from 'lodash';
import { CategoriasContabeisEmpresas } from 'src/app/core/categorias-contabeis-empresas';
import { CategoriasContabeisService } from 'src/app/services/categorias-contabeis/categorias-contabeis.service';
import { PlanosContas } from 'src/app/core/planos-contas';

@Component({
  selector: 'cadastrar-empresa',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.css']
})
export class CadastrarEmpresaComponent implements OnInit {


  @Input() tiposEmpresa:any[];
  @Input() titulo:String;
  @Input() showContaContabil:boolean = false;

  categoriaEmpresa: CategoriaEmpresa;
  planosContas: PlanosContas[];

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  categoriasEmpresa: any [] = [
    {id: CategoriaEmpresa.COMERCIAL, descricao: 'COMERCIAL'},
    {id: CategoriaEmpresa.INDUSTRIAS, descricao: 'INDUSTRIAS'},
    {id: CategoriaEmpresa.PRESTADOR_SERVICO, descricao: 'PRESTADOR DE SERVIÇOS'},
    {id: CategoriaEmpresa.OUTRO, descricao: 'OUTRO'},
    
  ];
  

  ufs:any[] =[
    {nome: 'DF'}
  ]

  public maskCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public maskCNPJ = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  
  empresa: Empresa = new Empresa();

  isAtualizar = false;

  constructor(
    private drc: ChangeDetectorRef,
    private empresaService: EmpresaService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
    private enderecoService: EnderecoService,
    private categoriasContabeisService: CategoriasContabeisService
  ) { }


  ngOnInit() {
   
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }

    this.categoriasContabeisService.getAllViewPlanosContas().subscribe((planosContas: PlanosContas[]) => {
      this.planosContas = planosContas;
    })

    this.enderecoService.getAllEstados().subscribe((ufs:any)=> {
      this.ufs = ufs;
    });

    let idEmpresa: number;
    idEmpresa = this.activatedRoute.snapshot.queryParams.idEmpresa ? this.activatedRoute.snapshot.queryParams.idEmpresa : null;
    if (idEmpresa) {
      this.isAtualizar = true;
      this.empresaService.getById(idEmpresa).subscribe((empresa: Empresa) => {
        this.empresa = empresa
      });
    }

  }

  ngAfterContentChecked(): void {
    this.drc.detectChanges();
  }

  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }
  cadastrar() {
    this.tratarDados();
    
    this.empresaService.cadastrar(this.empresa).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Empresa cadastrada com sucesso");
    });
  }

  
  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }

  limpar() {
    this.empresa = new Empresa();
   }

  cancelar() {
    this.location.back();
  }


  atualizar() {

    this.tratarDados();

    this.empresaService.alterar(this.empresa).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Empresa atualizada com sucesso");
    });

  }

  tratarDados(){
    this.empresa.cep = this.empresa.cep ? this.retiraMascara( this.empresa.cep.toString()) : null 
    this.empresa.cnpj = this.empresa.cnpj ? this.retiraMascara(this.empresa.cnpj) : null 
    this.empresa.telefone = this.empresa.telefone ? this.retiraMascara(this.empresa.telefone) : null 
    this.empresa.ativa = this.empresa.ativa ? 'S' : 'N'
  }


  
  addCategoriaContabil() {
    if (!this.empresa.categoriasContabeis) {
      this.empresa.categoriasContabeis = [];
    }

    const categoriaContabil:CategoriasContabeisEmpresas = new CategoriasContabeisEmpresas();    
    categoriaContabil.id          = undefined;
    categoriaContabil.idCategoria = undefined;
    categoriaContabil.idEmpresa   = this.empresa.id;
    this.empresa.categoriasContabeis.push(categoriaContabil);
  }


}
