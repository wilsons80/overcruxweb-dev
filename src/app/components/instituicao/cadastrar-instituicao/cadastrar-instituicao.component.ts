import { Component, OnInit } from '@angular/core';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ArquivoUnidadeService } from 'src/app/services/arquivo/arquivo.service';
import { FileUtils } from 'src/app/utils/file-utils';
import { InstituicaoService } from 'src/app/services/instituicao/instituicao.service';
import { switchMap } from 'rxjs/operators';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { Observable } from 'rxjs';
import { Instituicao } from 'src/app/core/instituicao';
import { ArquivoInstituicaoService } from 'src/app/services/arquivo/arquivo-instituicao.service';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'cadastrar-instituicao',
  templateUrl: './cadastrar-instituicao.component.html',
  styleUrls: ['./cadastrar-instituicao.component.css']
})
export class CadastrarInstituicaoComponent implements OnInit {

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  estados: any;

  instituicao: Instituicao = new Instituicao();
  instituicoes: Instituicao[];
  isAtualizar = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastService: ToastService,
              private arquivoInstituicaoService: ArquivoInstituicaoService,
              private fileUtils: FileUtils,
              private toolbarPrincipalService: ToolbarPrincipalService,
              private instituicaoService: InstituicaoService) { }

  ngOnInit() {
    this.initObjetos();
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }
    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.instituicaoService.getById(id).pipe(
        switchMap((instituicao: Instituicao) => {
          this.instituicao = instituicao;
          return this.arquivoInstituicaoService.get(instituicao.id);
        })
      ).subscribe((foto: any) => {
          this.instituicao.foto = foto;
          foto = this.fileUtils.convertBufferArrayToBase64(foto);
          this.instituicao.urlFoto = foto ? foto.changingThisBreaksApplicationSecurity : '';
      });
    }

    this.instituicaoService.getAll().subscribe((dados: Instituicao[]) => {
      this.instituicoes = dados;
    });
  }
  
  initObjetos() {
    this.instituicao = new Instituicao();
    this.instituicao.funcoesInstituicao = [];
  }


  cancelar() {
    this.router.navigate(['instituicao']);
  }

  atualizar() {
    this.instituicaoService.alterar(this.instituicao).pipe(
      switchMap((instituicaoRetorno: Instituicao) => {
        if (this.instituicao.isFotoChanged && this.instituicao.foto) {
          return this.arquivoInstituicaoService.alterarComIdInstituicao(this.instituicao.foto, instituicaoRetorno.id);
        } else {
          return new Observable(obs => obs.next());
        }
      })

    ).subscribe(() => {
      this.router.navigate(['instituicao']);
      this.toastService.showSucesso('Instituição atualizada com sucesso');
    });
  }

  limpar() {
    this.instituicao = new Instituicao();
  }

  cadastrar() {
    this.instituicaoService.cadastrar(this.instituicao).pipe(
      switchMap((instituicao: Instituicao) => {
        if (this.instituicao.isFotoChanged && this.instituicao.foto) {
          return this.arquivoInstituicaoService.gravarComIdInstituicao(this.instituicao.foto, instituicao.id);
        } else {
          return new Observable(obs => obs.next());
        }
      })

    ).subscribe(() => {
      this.router.navigate(['instituicao']);
      this.toastService.showSucesso('Instituição cadastrada com sucesso');
    });
  }


  fileChangeEvent(event: any): void {
    this.instituicao.foto = event.target.files[0];
    this.instituicao.isFotoChanged = true;
    this.readThis(event.target);
  }

  getBackground() {
    if (this.instituicao && this.instituicao.urlFoto) {
      return `url(${this.instituicao.urlFoto})`;
    }
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.instituicao.urlFoto = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }


  mostrarBotaoLimpar() {
    if (this.isAtualizar) {return false; }
    if (!this.mostrarBotaoAtualizar) {return false; }
    if (!this.mostrarBotaoCadastrar) {return false; }

    return true;
  }

}
