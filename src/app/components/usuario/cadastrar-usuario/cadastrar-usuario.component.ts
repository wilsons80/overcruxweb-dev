import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioSistemaService } from 'src/app/services/usuario-sistema/usuario-sistema.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { UsuarioSistema } from 'src/app/core/usuario-sistema';
import { ArquivoPessoaFisicaService } from 'src/app/services/arquivo-pessoa-fisica/arquivo-pessoa-fisica.service';
import { FileUtils } from 'src/app/utils/file-utils';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  usuarioSistema: UsuarioSistema = new UsuarioSistema();

  isAtualizar = false;

  constructor(
    private usuarioSistemaService: UsuarioSistemaService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private arquivoPessoaFisicaService: ArquivoPessoaFisicaService,
    private fileUtils: FileUtils,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];
    
    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }

    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }

    this.limpar();

    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.usuarioSistemaService.getById(id).pipe(
        switchMap((usuarioSistema: UsuarioSistema) => {
          this.usuarioSistema = usuarioSistema;
          return this.arquivoPessoaFisicaService.get(usuarioSistema.pessoaFisica.id);
        })
      ).subscribe((foto: any) => {
        this.usuarioSistema.pessoaFisica.foto = foto;
        foto = this.fileUtils.convertBufferArrayToBase64(foto);
        this.usuarioSistema.pessoaFisica.urlFoto = foto.changingThisBreaksApplicationSecurity;
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
    this.usuarioSistemaService.cadastrar(this.usuarioSistema).pipe(
      switchMap((alunoRetorno: UsuarioSistema) => {
        if (this.usuarioSistema.pessoaFisica.isFotoChanged && this.usuarioSistema.pessoaFisica.foto) {
          return this.arquivoPessoaFisicaService.gravar(this.usuarioSistema.pessoaFisica.foto, alunoRetorno.pessoaFisica.id);
        } else {
          return new Observable(obs => obs.next());
        }
      })
    ).subscribe(() => {
      this.router.navigate(['usuariosistema']);
      this.toastService.showSucesso('Usuário cadastrado com sucesso');
    });
  }

  limpar() {
    this.usuarioSistema = new UsuarioSistema();
    this.usuarioSistema.unidades = [];
    this.usuarioSistema.pessoaFisica = new PessoaFisica();
  }

  cancelar() {
    this.router.navigate(['usuariosistema']);
  }

  retiraMascara(objeto) {
    return objeto.replace(/\D/g, '');
  }



  atualizar() {
    this.tratarDados();
    this.usuarioSistemaService.alterar(this.usuarioSistema).pipe(
      switchMap((usuarioSistema: UsuarioSistema) => {
        if (this.usuarioSistema.pessoaFisica.isFotoChanged && this.usuarioSistema.pessoaFisica.foto) {
          return this.arquivoPessoaFisicaService.alterar(this.usuarioSistema.pessoaFisica.foto, usuarioSistema.pessoaFisica.id);
        } else {
         return new Observable(obs => obs.next());
        }
      })
    ).subscribe(() => {
      this.router.navigate(['usuariosistema']);
      this.toastService.showSucesso('Usuário atualizado com sucesso');
    });
  }


  tratarDados() {
    this.usuarioSistema.pessoaFisica.cep = this.usuarioSistema.pessoaFisica.cep ? this.retiraMascara(this.usuarioSistema.pessoaFisica.cep.toString()) : null
    this.usuarioSistema.pessoaFisica.celular = this.usuarioSistema.pessoaFisica.celular ? this.retiraMascara(this.usuarioSistema.pessoaFisica.celular.toString()) : null
    this.usuarioSistema.pessoaFisica.cpf = this.usuarioSistema.pessoaFisica.cpf ? this.retiraMascara(this.usuarioSistema.pessoaFisica.cpf.toString()) : null
    this.usuarioSistema.pessoaFisica.telefoneResidencial = this.usuarioSistema.pessoaFisica.telefoneResidencial ? this.retiraMascara(this.usuarioSistema.pessoaFisica.telefoneResidencial.toString()) : null
  }
}
