import { Component, OnInit } from '@angular/core';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { Aluno } from 'src/app/core/aluno';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { ArquivoPessoaFisicaService } from 'src/app/services/arquivo-pessoa-fisica/arquivo-pessoa-fisica.service';
import { FileUtils } from 'src/app/utils/file-utils';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GrausInstrucao } from 'src/app/core/graus-instrucao';
import { Acesso } from 'src/app/core/acesso';
import { AutenticadorService } from 'src/app/services/autenticador/autenticador.service';
import { LoadingPopupService } from 'src/app/services/loadingPopup/loading-popup.service';

@Component({
  selector: 'app-cadastar-aluno',
  templateUrl: './cadastar-aluno.component.html',
  styleUrls: ['./cadastar-aluno.component.css']
})
export class CadastarAlunoComponent implements OnInit {

  aluno: Aluno = new Aluno();

  isAtualizar = false;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  constructor(
    private alunoService: AlunoService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
    private arquivoPessoaFisicaService: ArquivoPessoaFisicaService,
    private fileUtils: FileUtils,
    private autenticadorService: AutenticadorService,
    private loadingPopupService: LoadingPopupService,
  ) {
  }
  
  ngOnInit() {
    this.aluno = new Aluno();
    this.aluno.pessoaFisica = new PessoaFisica();
    this.aluno.vulnerabilidades = [];
    this.aluno.pessoaFisica.grausInstrucao = new GrausInstrucao();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }

    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }

    let idAluno: number;
    idAluno = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (idAluno) {
      this.isAtualizar = true;
      this.alunoService.getById(idAluno).pipe(
        switchMap((aluno: Aluno) => {
          this.aluno = aluno;
          return this.arquivoPessoaFisicaService.get(aluno.pessoaFisica.id);
        })
      ).subscribe((foto: any) => {
        this.aluno.pessoaFisica.foto = foto;
        foto = this.fileUtils.convertBufferArrayToBase64(foto);
        this.aluno.pessoaFisica.urlFoto = foto.changingThisBreaksApplicationSecurity;
      });
    }
  }
  
  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.tratarDados();
    console.log("Aluno", this.aluno);
    this.alunoService.cadastrar(this.aluno).pipe(
      switchMap((alunoRetorno: Aluno) => {
        if (this.aluno.pessoaFisica.isFotoChanged && this.aluno.pessoaFisica.foto) {
          return this.arquivoPessoaFisicaService.gravar(this.aluno.pessoaFisica.foto, alunoRetorno.pessoaFisica.id);
        } else {
          return new Observable(obs => obs.next());
        }
      })
    ).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Aluno cadastrado com sucesso');
    });
  }

  tratarDados() {
    this.aluno.pessoaFisica.cep = this.aluno.pessoaFisica.cep ? this.retiraMascara(this.aluno.pessoaFisica.cep.toString()) : null
    this.aluno.pessoaFisica.celular = this.aluno.pessoaFisica.celular ? this.retiraMascara(this.aluno.pessoaFisica.celular.toString()) : null
    this.aluno.pessoaFisica.cpf = this.aluno.pessoaFisica.cpf ? this.retiraMascara(this.aluno.pessoaFisica.cpf.toString()) : null
    this.aluno.pessoaFisica.telefoneResidencial = this.aluno.pessoaFisica.telefoneResidencial ? this.retiraMascara(this.aluno.pessoaFisica.telefoneResidencial.toString()) : null
  }

  limpar() {
    this.aluno = new Aluno();
  }

  cancelar() {
    this.location.back();
  }

  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }



  atualizar() {
    console.log("Aluno", this.aluno);
    this.tratarDados();

    if (this.aluno.pessoaFisica.cpf === null) {
      this.aluno.pessoaFisica.cpf = String(this.aluno.id);
    }

    this.loadingPopupService.mostrarMensagemDialog('Salvando dados do aluno, aguarde...');
    this.alunoService.alterar(this.aluno).pipe(
      switchMap((aluno: Aluno) => {
        if (this.aluno.pessoaFisica.isFotoChanged && this.aluno.pessoaFisica.foto) {
          return this.arquivoPessoaFisicaService.alterar(this.aluno.pessoaFisica.foto, aluno.pessoaFisica.id);
        } else {
         return new Observable(obs => obs.next());
        }
      })
    ).subscribe(
      () => {
        this.loadingPopupService.closeDialog();
        this.toastService.showSucesso('Aluno atualizado com sucesso');
        this.autenticadorService.revalidarSessao();
      
        this.alunoService.getById(this.aluno.id).subscribe((aluno: Aluno) => {
          Object.assign(this.aluno, aluno);
        });
    },
    (error) => {
      this.loadingPopupService.closeDialog();
    });

  }

}
