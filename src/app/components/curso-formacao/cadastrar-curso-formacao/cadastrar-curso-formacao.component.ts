import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoFormacao } from 'src/app/core/curso-formacao';
import { CursoFormacaoService } from 'src/app/services/curso-formacao/curso-formacao.service';
import { PessoaFisicaService } from 'src/app/services/pessoa-fisica/pessoa-fisica.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PessoaFisica } from './../../../core/pessoa-fisica';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-cadastrar-curso-formacao',
  templateUrl: './cadastrar-curso-formacao.component.html',
  styleUrls: ['./cadastrar-curso-formacao.component.css']
})
export class CadastrarCursoFormacaoComponent implements OnInit {

  cursoFormacao: CursoFormacao ;

  listaPessoaFisica:PessoaFisica[];

  isAtualizar: boolean = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private cursoFormacaoService: CursoFormacaoService,
    private pessoaFisicaService: PessoaFisicaService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
  ) { }


  ngOnInit() {
    this.inicializarObjetos();
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }

    this.pessoaFisicaService.getAll().subscribe((lista:PessoaFisica[]) => {
      this.listaPessoaFisica = lista;
    });

    let idCursoFormacao: number;
    idCursoFormacao = this.activatedRoute.snapshot.queryParams.idCursoFormacao ? this.activatedRoute.snapshot.queryParams.idCursoFormacao : null;
    if (idCursoFormacao) {
      this.isAtualizar = true;
      this.cursoFormacaoService.getById(idCursoFormacao).subscribe((cursoFormacao: CursoFormacao) => {
        this.cursoFormacao = cursoFormacao
      });
    }

  }
  inicializarObjetos() {
    this.cursoFormacao = new CursoFormacao();
    this.cursoFormacao.pessoaFisica = new PessoaFisica();
  }

  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }
  
  cadastrar() {
    this.cursoFormacaoService.cadastrar(this.cursoFormacao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Curso de Formação cadastrado com sucesso");
    });
  }

  limpar() {
      this.inicializarObjetos();
   }

  cancelar() {
    this.location.back();
  }


  atualizar() {
    this.cursoFormacaoService.alterar(this.cursoFormacao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Curso de Formação cadastrado com sucesso");
    });

  }

}
