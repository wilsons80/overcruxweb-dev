import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from 'src/app/core/atendimento';
import { Familiares } from 'src/app/core/familiares';
import { Funcionario } from 'src/app/core/funcionario';
import { ParticipanteAtendimento } from 'src/app/core/participante-atendimento';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';
import { AtendimentosService } from 'src/app/services/atendimentos/atendimentos.service';
import { FamiliarAlunoService } from 'src/app/services/familiar-aluno/familiar-aluno.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { ParticipantesAtendimentosService } from 'src/app/services/participantes-atendimentos/participantes-atendimentos.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-cadastrar-participante-atendimento',
  templateUrl: './cadastrar-participante-atendimento.component.html',
  styleUrls: ['./cadastrar-participante-atendimento.component.css']
})
export class CadastrarParticipanteAtendimentoComponent implements OnInit {


  participanteAtendimento: ParticipanteAtendimento = new ParticipanteAtendimento();


  atendimentos: Atendimento[];
  familiares: Familiares[];
  funcionarios: Funcionario[];


  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();


  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private atendimentoService: AtendimentosService,
    private familiarAlunoService: FamiliarAlunoService,
    private funcionarioService: FuncionarioService,
    private participantesAtendimentosService: ParticipantesAtendimentosService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) {
  }


  ngOnInit() {

    this.participanteAtendimento.atendimento = new Atendimento();
    this.participanteAtendimento.familiar = new Familiares();
    this.participanteAtendimento.funcionario = new Funcionario();


    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }
    this.atendimentoService.getAll().subscribe((atendimentos: Atendimento[]) => {
      this.atendimentos = atendimentos;
    })

    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    })

    this.familiarAlunoService.getAll().subscribe((familiares: Familiares[]) => {
      this.familiares = familiares;
    })

    

    let idParticipanteAtendimento: number;
    idParticipanteAtendimento = this.activatedRoute.snapshot.queryParams.idParticipanteAtendimento ? this.activatedRoute.snapshot.queryParams.idParticipanteAtendimento : null;
    if (idParticipanteAtendimento) {
      this.isAtualizar = true;
      this.participantesAtendimentosService.getById(idParticipanteAtendimento).subscribe((participanteAtendimento: ParticipanteAtendimento) => {
        this.participanteAtendimento = participanteAtendimento
      });
    }

  }
  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.participantesAtendimentosService.cadastrar(this.participanteAtendimento).subscribe(() => {
      this.router.navigate(['participanteatendimento']);
      this.toastService.showSucesso("Atendimento cadastrado com sucesso");
    });
  }

  limpar() {
    this.participanteAtendimento = new ParticipanteAtendimento();
  }

  cancelar() {
    this.router.navigate(['participanteatendimento']);
  }


  atualizar() {
    this.participantesAtendimentosService.alterar(this.participanteAtendimento).subscribe(() => {
      this.router.navigate(['participanteatendimento']);
      this.toastService.showSucesso("Atendimento atualizado com sucesso");
    });

  }

  setFuncionario(idFuncionario: number){
    this.participanteAtendimento.funcionario = _.cloneDeep(_.find(this.funcionarios, (f: Funcionario) => f.id === idFuncionario));
  }

  setFamiliar(idFamiliar: number){
    this.participanteAtendimento.familiar = _.cloneDeep(_.find(this.familiares, (f: Familiares) => f.id === idFamiliar));
  }

}
