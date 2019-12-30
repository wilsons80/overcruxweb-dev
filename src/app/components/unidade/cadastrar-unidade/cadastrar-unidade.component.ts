import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Acesso } from 'src/app/core/acesso';
import { Unidade } from 'src/app/core/unidade';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { FileUtils } from 'src/app/utils/file-utils';
import { ArquivoUnidadeService } from './../../../services/arquivo/arquivo.service';
import { ToastService } from './../../../services/toast/toast.service';
import { Instituicao } from 'src/app/core/instituicao';
import { InstituicaoService } from 'src/app/services/instituicao/instituicao.service';
import { TipoUnidade } from 'src/app/core/tipo-unidade';
import * as _ from 'lodash';


@Component({
  selector: 'cadastrar-unidade',
  templateUrl: './cadastrar-unidade.component.html',
  styleUrls: ['./cadastrar-unidade.component.css']
})
export class CadastrarUnidadeComponent implements OnInit {

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  estados: any;

  unidade: Unidade;
  instituicoes: Instituicao[];
  isAtualizar = false;


  public maskCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public maskCNJP = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public maskPhone   = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCelular = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  unidades: any[];

  tiposUnidade: TipoUnidade = new TipoUnidade();

  // MATRIZ(1, 'M'), FILIAL(2, 'F');

  situacoesImovel: any[] = [
    { id: '1', tipo: 'P', descricao: 'PRÓPRIO' },
    { id: '2', tipo: 'C', descricao: 'CONCESSÃO' },
    { id: '3', tipo: 'L', descricao: 'LICENÇA PRA FUNCIONAMENTO' },
    { id: '4', tipo: 'O', descricao: 'OUTRO' }
  ]


  constructor(
    private enderecoService: EnderecoService,
    private activatedRoute: ActivatedRoute,
    private unidadeService: UnidadeService,
    private router: Router,
    private toastService: ToastService,
    private arquivoUnidadeService: ArquivoUnidadeService,
    private fileUtils: FileUtils,
    private toolbarPrincipalService: ToolbarPrincipalService,
    private instituicaoService: InstituicaoService
  ) { }

  ngOnInit() {
    this.inicializarObjetos();
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }
    let idUnidade: number;
    idUnidade = this.activatedRoute.snapshot.queryParams.idUnidade ? this.activatedRoute.snapshot.queryParams.idUnidade : null;
    if (idUnidade) {
      this.isAtualizar = true;
      this.unidadeService.getById(idUnidade).pipe(
        switchMap((unidade: Unidade) => {
          this.unidade = unidade;
          return this.arquivoUnidadeService.get(unidade.idUnidade)
        })
      ).subscribe((foto: any) => {
          this.unidade.foto = foto;
          foto = this.fileUtils.convertBufferArrayToBase64(foto);
          this.unidade.urlFoto = foto.changingThisBreaksApplicationSecurity;
      });
    }

    this.enderecoService.getAllEstados().subscribe(estados => {
      this.estados = estados;
    });

    this.instituicaoService.getAll().subscribe((dados: Instituicao[]) => {
      this.instituicoes = dados;
    });
  }
  inicializarObjetos() {
    this.unidade = new Unidade();
    this.unidade.instituicao = new Instituicao();
  }

  cancelar() {
    this.router.navigate(['unidade']);
  }

  atualizar() {
    this.tratarDados();
    this.unidadeService.alterar(this.unidade).pipe(
      switchMap((unidadeRetorno: Unidade) => {
        if (this.unidade.isFotoChanged && this.unidade.foto) {
          return this.arquivoUnidadeService.alterarComIdUnidade(this.unidade.foto, unidadeRetorno.idUnidade);
        } else {
          return new Observable(obs => obs.next());
        }
      })

    ).subscribe(() => {
      if (this.unidade.idUnidade === this.toolbarPrincipalService.unidadeSelecionada.id) {
        localStorage.removeItem('logo');
      }
      this.router.navigate(['unidade']);
      this.toastService.showSucesso('Unidade atualizada com sucesso');
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cadastrar() {
    this.tratarDados();
    this.unidadeService.cadastrar(this.unidade).pipe(
      switchMap((unidade: Unidade) => {
        if (this.unidade.isFotoChanged && this.unidade.foto) {
          return this.arquivoUnidadeService.gravarComIdUnidade(this.unidade.foto, unidade.idUnidade)
        } else {
          return new Observable(obs => obs.next());
        }
      })

    ).subscribe(() => {
      this.router.navigate(['unidade'])
      this.toastService.showSucesso('Unidade cadastrada com sucesso');
    })
  }


  tratarDados() {
    this.unidade.cep = this.unidade.cep ? this.retiraMascara(this.unidade.cep.toString()) : null;
    this.unidade.celular = this.unidade.celular ? this.retiraMascara(this.unidade.celular.toString()) : null;
    this.unidade.telefone = this.unidade.telefone ? this.retiraMascara(this.unidade.telefone.toString()) : null;
    this.unidade.cnpj = this.unidade.cnpj ? this.retiraMascara(this.unidade.cnpj.toString()) : null;
  }

  fileChangeEvent(event: any): void {
    this.unidade.foto = event.target.files[0];
    this.unidade.isFotoChanged = true;
    this.readThis(event.target);
  }

  getBackground() {
    if (this.unidade && this.unidade.urlFoto) {
      return `url(${this.unidade.urlFoto})`
    }
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.unidade.urlFoto = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }


  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }


  carregarInstituicao(idInstituicao: number) {
    this.unidade.instituicao = _.cloneDeep(_.find(this.instituicoes, (d: Instituicao) => d.id === idInstituicao));
  }
}
