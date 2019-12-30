import { NiveisTurmas } from './../../../core/niveis-turmas';
import { Component, OnInit } from '@angular/core';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { NiveisTurmasService } from 'src/app/services/niveis-turmas/niveis-turmas.service';

@Component({
  selector: 'cadastrar-niveis-turmas',
  templateUrl: './cadastrar-niveis-turmas.component.html',
  styleUrls: ['./cadastrar-niveis-turmas.component.css']
})
export class CadastrarNiveisTurmasComponent implements OnInit {

  nivelTurma: NiveisTurmas;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  constructor(
    private niveisTurmasService: NiveisTurmasService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
  }


  ngOnInit() {
    this.inicializarObjetos();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

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
      this.niveisTurmasService.getById(id).subscribe((nivelTurma: NiveisTurmas) => {
        this.nivelTurma = nivelTurma;
      });
    }

  }
  inicializarObjetos() {
    this.nivelTurma = new NiveisTurmas();
  }
  
  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }
  cadastrar() {
    this.niveisTurmasService.cadastrar(this.nivelTurma).subscribe(() => {
      this.router.navigate(['niveisturmas']);
      this.toastService.showSucesso('Nível de turma cadastrado com sucesso!');
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['niveisturmas']);
  }


  atualizar() {
    this.niveisTurmasService.alterar(this.nivelTurma).subscribe(() => {
      this.router.navigate(['niveisturmas']);
      this.toastService.showSucesso('Nível de turma atualizado com sucesso!');
    });

  }

}
