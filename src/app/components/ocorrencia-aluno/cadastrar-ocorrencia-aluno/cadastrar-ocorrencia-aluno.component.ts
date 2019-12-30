import { TipoOcorrenciaAluno } from 'src/app/core/tipo-ocorrencia-aluno';
import { Aluno } from './../../../core/aluno';
import { AlunoService } from './../../../services/aluno/aluno.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { OcorrenciaAluno } from 'src/app/core/ocorrencia-aluno';
import { Funcionario } from 'src/app/core/funcionario';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { TipoOcorrenciaAlunoService } from 'src/app/services/tipo-ocorrencia-aluno/tipo-ocorrencia-aluno.service';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { OcorrenciaAlunoService } from 'src/app/services/ocorrencia-aluno/ocorrencia-aluno.service';
import * as _ from 'lodash';

@Component({
  selector: 'cadastrar-ocorrencia-aluno',
  templateUrl: './cadastrar-ocorrencia-aluno.component.html',
  styleUrls: ['./cadastrar-ocorrencia-aluno.component.css']
})
export class CadastrarOcorrenciaAlunoComponent implements OnInit {

  listaDeAlunos: Aluno[];
  listaDeTipoOcorrencia: TipoOcorrenciaAluno[];
  listaDeFuncionarios: Funcionario[];

  ocorrenciaAluno: OcorrenciaAluno = new OcorrenciaAluno();

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  constructor(private toolbarPrincipalService: ToolbarPrincipalService,
              private funcionarioService: FuncionarioService,
              private tipoOcorrenciaService: TipoOcorrenciaAlunoService,
              private ocorrenciaService: OcorrenciaAlunoService,
              private alunoService: AlunoService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastService: ToastService) { }


  ngOnInit() {

    this.ocorrenciaAluno.aluno = new Aluno();
    this.ocorrenciaAluno.funcionario = new Funcionario();
    this.ocorrenciaAluno.tipoOcorrenciaAluno = new TipoOcorrenciaAluno();

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
      this.ocorrenciaService.getById(id).subscribe((ocorrenciaAluno: OcorrenciaAluno) => {
        this.ocorrenciaAluno = ocorrenciaAluno;
      });
    }

    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.listaDeAlunos = alunos;
    });

    this.tipoOcorrenciaService.getAll().subscribe( (tipos: TipoOcorrenciaAluno[]) => {
      this.listaDeTipoOcorrencia = tipos;
    });

    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.listaDeFuncionarios = funcionarios;
    });
  }



  mostrarBotaoLimpar(){
    if (this.isAtualizar)  { return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }


  cadastrar() {
    if (!this.isDataCienciaValida() ) {
      this.toastService.showAlerta('A data de ciência não pode ser inferior a data da ocorrência.');
      return;
    }

    this.ocorrenciaService.cadastrar(this.ocorrenciaAluno).subscribe(() => {
      this.router.navigate(['ocorrenciaaluno']);
      this.toastService.showSucesso('Ocorrência cadastrada com sucesso!');
    });
  }

  limpar() {
    this.ocorrenciaAluno = new OcorrenciaAluno();
  }

  cancelar() {
    this.router.navigate(['ocorrenciaaluno']);
  }


  atualizar() {
    if (!this.isDataCienciaValida() ) {
      this.toastService.showAlerta('A data de ciência não pode ser inferior a data da ocorrência.');
      return;
    }

    this.ocorrenciaService.alterar(this.ocorrenciaAluno).subscribe(() => {
      this.router.navigate(['ocorrenciaaluno']);
      this.toastService.showSucesso('Ocorrência atualizada com sucesso.');
    });

  }

  mostrarDadosFuncionario(idFuncionario: number) {
    this.ocorrenciaAluno.funcionario = _.cloneDeep(_.find(this.listaDeFuncionarios, (f: Funcionario) => f.id === idFuncionario));
  }

  mostrarDadosAluno(idAluno: number) {
    this.ocorrenciaAluno.aluno = _.cloneDeep(_.find(this.listaDeAlunos, (f: Aluno) => f.id === idAluno));
  }

  isDataCienciaValida() {
    if (this.ocorrenciaAluno.dataCiencia 
        && 
        new Date(this.ocorrenciaAluno.dataCiencia).getTime() < new Date(this.ocorrenciaAluno.dataOcorrencia).getTime()) {
      return false;
    }
    return true;
  }
}
