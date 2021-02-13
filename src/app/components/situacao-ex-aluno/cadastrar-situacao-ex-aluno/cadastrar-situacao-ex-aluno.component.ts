import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Aluno } from 'src/app/core/aluno';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { ComboAluno } from 'src/app/core/combo-aluno';
import { FilterAlunos } from 'src/app/core/filter-alunos';
import { Iniciativa } from 'src/app/core/iniciativa';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { Programa } from 'src/app/core/programa';
import { SituacaoExAluno } from 'src/app/core/situacoes-ex-alunos';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { SituacoesExAlunosService } from 'src/app/services/situacoes-ex-alunos/situacoes-ex-alunos.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'cadastrar-situacao-ex-aluno',
  templateUrl: './cadastrar-situacao-ex-aluno.component.html',
  styleUrls: ['./cadastrar-situacao-ex-aluno.component.css']
})
export class CadastrarSituacaoExAlunoComponent implements OnInit {

  filtro: FilterAlunos;

  programas: Programa[];
  condicaoDeTrabalho = ['BOA', 'RUIM'];
  situacaoExAluno: SituacaoExAluno;

  
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  isAtualizar: boolean = false;

  constructor(
    private situacoesExAlunosService: SituacoesExAlunosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private alunoService: AlunoService,
  ) {
    this.carregarPerfil = new CarregarPerfil();
  }


  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);
    this.inicializarObjetos()

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.situacoesExAlunosService.getById(id).subscribe((situacaoExAluno: SituacaoExAluno) => {
        this.situacaoExAluno = situacaoExAluno;
        this.filtro.aluno = {
          id: this.situacaoExAluno.aluno.id ,
          nome: this.situacaoExAluno.aluno.pessoaFisica.nome
        }
      });
    }

  }


  inicializarObjetos() {
    this.filtro = new FilterAlunos();
    this.filtro.aluno = new ComboAluno();

    this.situacaoExAluno = new SituacaoExAluno();
    this.situacaoExAluno.aluno = new Aluno();
    this.situacaoExAluno.aluno.pessoaFisica = new PessoaFisica();
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.situacoesExAlunosService.cadastrar(this.situacaoExAluno).subscribe(() => {
      this.toastService.showSucesso("Situação cadastrada com sucesso");
    });
  }


  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['situacoesexalunos']);
  }

  atualizar() {
    this.situacoesExAlunosService.alterar(this.situacaoExAluno).subscribe(() => {
      this.toastService.showSucesso("Situação atualizada com sucesso");
    });
  }

  onValorChange(event: any) {
    this.filtro.aluno = event;
    if(this.filtro.aluno){
      this.mostrarDadosAluno(this.filtro.aluno.id);
    } else {
      this.situacaoExAluno.aluno = null;
    }
  }


  mostrarDadosAluno(idAluno:number) {
    this.alunoService.getById(idAluno).subscribe((aluno: Aluno) => {
      this.situacaoExAluno.aluno = aluno;
    })
  }

}
