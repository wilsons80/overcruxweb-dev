import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Questionario } from 'src/app/core/questionario';
import { QuestionarioService } from 'src/app/services/questionario/questionario.service';
import { ObjetivoService } from 'src/app/services/objetivo/objetivo.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TipoQuestionario } from 'src/app/core/tipo-questionario';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-cadastrar-questionario',
  templateUrl: './cadastrar-questionario.component.html',
  styleUrls: ['./cadastrar-questionario.component.css']
})
export class CadastrarQuestionarioComponent implements OnInit {

  questionario: Questionario = new Questionario();

  isAtualizar = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();


  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  tiposQuestionario: TipoQuestionario = new TipoQuestionario();

  constructor(
    private questionarioService: QuestionarioService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) {
  }


  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

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
