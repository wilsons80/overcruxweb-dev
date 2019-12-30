import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Aluno } from 'src/app/core/aluno';
import { AlunoTrabalhando } from 'src/app/core/aluno-trabalhando';
import { AlunoTrabalhandoService } from 'src/app/services/aluno-trabalhando/aluno-trabalhando.service';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-cadastrar-aluno-trabalhando',
  templateUrl: './cadastrar-aluno-trabalhando.component.html',
  styleUrls: ['./cadastrar-aluno-trabalhando.component.css']
})
export class CadastrarAlunoTrabalhandoComponent implements OnInit {

  alunos: Aluno[];
  alunoTrabalhando: AlunoTrabalhando = new AlunoTrabalhando();


  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private alunoService: AlunoService,
    private alunoTrabalhandoService: AlunoTrabalhandoService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) {
  }


  ngOnInit() {

    this.alunoTrabalhando.aluno = new Aluno();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
    })

    let idAlunoTrabalhando: number;
    idAlunoTrabalhando = this.activatedRoute.snapshot.queryParams.idAlunoTrabalhando ? this.activatedRoute.snapshot.queryParams.idAlunoTrabalhando : null;
    if (idAlunoTrabalhando) {
      this.isAtualizar = true;
      this.alunoTrabalhandoService.getById(idAlunoTrabalhando).subscribe((alunoTrabalhando: AlunoTrabalhando) => {
        this.alunoTrabalhando = alunoTrabalhando
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
    this.alunoTrabalhandoService.cadastrar(this.alunoTrabalhando).subscribe(() => {
      this.router.navigate(['alunotrabalhando']);
      this.toastService.showSucesso("Aluno trabalhando cadastrado com sucesso");
    });
  }

  limpar() {
    this.alunoTrabalhando = new AlunoTrabalhando();
  }

  cancelar() {
    this.router.navigate(['alunotrabalhando']);
  }


  atualizar() {
    this.alunoTrabalhandoService.alterar(this.alunoTrabalhando).subscribe(() => {
      this.router.navigate(['alunotrabalhando']);
      this.toastService.showSucesso("Aluno trabalhando atualizado com sucesso");
    });

  }

  mostrarDadosAluno(idAluno:number) {
    this.alunoTrabalhando.aluno = _.find(this.alunos, (a: Aluno) => a.id === idAluno);
  }

}
