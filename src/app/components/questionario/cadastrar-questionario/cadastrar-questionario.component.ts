import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Questionario } from 'src/app/core/questionario';
import { QuestionarioService } from 'src/app/services/questionario/questionario.service';
import { ObjetivoService } from 'src/app/services/objetivo/objetivo.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Objetivo } from 'src/app/core/objetivo';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'app-cadastrar-questionario',
  templateUrl: './cadastrar-questionario.component.html',
  styleUrls: ['./cadastrar-questionario.component.css']
})
export class CadastrarQuestionarioComponent implements OnInit {

  questionario: Questionario = new Questionario();

  isAtualizar: boolean = false;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  tiposQuestionario = [
    {id: 1, tipo: "T", descricao: "TALENTO" },
    {id: 2, tipo: "G", descricao: "GRUPO FAMILIAR" },
    {id: 3, tipo: "O", descricao: "OUTRO" },
  ]
  constructor(
    private questionarioService: QuestionarioService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService:ToastService
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

    let idQuestionario: number;
    idQuestionario = this.activatedRoute.snapshot.queryParams.idQuestionario ? this.activatedRoute.snapshot.queryParams.idQuestionario : null;
    if (idQuestionario) {
      this.isAtualizar = true;
      this.questionarioService.getById(idQuestionario).subscribe((ind: Questionario) => {
        this.questionario = ind;
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
    this.questionarioService.cadastrar(this.questionario).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Questionário cadastrado com sucesso");
    });
  }

  limpar() {
    this.questionario = new Questionario()
  }

  cancelar() {
    this.location.back();
  }


  atualizar() {
    this.questionarioService.alterar(this.questionario).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Questionário atualizado com sucesso");
    });

  }

}
