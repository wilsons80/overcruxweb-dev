import { FuncionarioService } from './../../../services/funcionario/funcionario.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Talento } from 'src/app/core/talento';
import { PessoaFisicaService } from 'src/app/services/pessoa-fisica/pessoa-fisica.service';
import { QuestionarioService } from 'src/app/services/questionario/questionario.service';
import { TalentosService } from 'src/app/services/talentos/talentos.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { PessoaFisica } from './../../../core/pessoa-fisica';
import { Questionario } from './../../../core/questionario';
import { Acesso } from 'src/app/core/acesso';
import * as _ from 'lodash';
import { Funcionario } from 'src/app/core/funcionario';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-cadastrar-talento',
  templateUrl: './cadastrar-talento.component.html',
  styleUrls: ['./cadastrar-talento.component.css']
})
export class CadastrarTalentoComponent implements OnInit {

  funcionarios: Funcionario[];
  talento: Talento;
  questionarios: Questionario[];

  isAtualizar: boolean = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private questionarioService: QuestionarioService,
    private talentosService: TalentosService,
    private funcionarioService: FuncionarioService,
    private pessoaFisicaService: PessoaFisicaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
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

    this.questionarioService.getAll().subscribe((questionarios: Questionario[]) => {
      this.questionarios = questionarios;
    });

    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    });

    let idTalento: number;
    idTalento = this.activatedRoute.snapshot.queryParams.idTalento ? this.activatedRoute.snapshot.queryParams.idTalento : null;
    if (idTalento) {
      this.isAtualizar = true;
      this.talentosService.getById(idTalento).subscribe((talento: Talento) => {
        this.talento = talento;
      });
    }

  }
  inicializarObjetos() {
    this.talento = new Talento();
    this.talento.questionario = new Questionario();
    this.talento.funcionario = new Funcionario();
  }
  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }
  cadastrar() {
    this.talentosService.cadastrar(this.talento).subscribe(() => {
      this.router.navigate(['talento']);
      this.toastService.showSucesso("Talento cadastrado com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['talento']);
  }


  atualizar() {
    this.talentosService.alterar(this.talento).subscribe(() => {
      this.router.navigate(['talento']);
      this.toastService.showSucesso("Talento atualizado com sucesso");
    });

  }

  mostrarFuncionario(idFuncionario:number) {
    this.talento.funcionario =_.cloneDeep(_.find(this.funcionarios, (f: Funcionario) => f.id === idFuncionario));
  }



}
