import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Aluno } from 'src/app/core/aluno';
import { Atividade } from 'src/app/core/atividade';
import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { AtividadeAlunoService } from 'src/app/services/atividade-aluno/atividade-aluno.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AlunoService } from './../../../services/aluno/aluno.service';
import * as _ from 'lodash';
import { TurmasService } from 'src/app/services/turmas/turmas.service';
import { Turmas } from 'src/app/core/turmas';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { AutenticadorService } from 'src/app/services/autenticador/autenticador.service';
import { FilterAlunos } from 'src/app/core/filter-alunos';
import { ComboAluno } from 'src/app/core/combo-aluno';

@Component({
  selector: 'app-cadastrar-atividade-aluno',
  templateUrl: './cadastrar-atividade-aluno.component.html',
  styleUrls: ['./cadastrar-atividade-aluno.component.css']
})
export class CadastrarAtividadeAlunoComponent implements OnInit {

  filtro: FilterAlunos = new FilterAlunos();
  conflitos = [];

  atividadeAluno: AtividadeAluno = new AtividadeAluno();
  
  atividades: Atividade[];
  atividadesSemTurma: Atividade[];
  turmas: Turmas[];

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;
  tipoOficina = null;

  constructor(
    private atividadeAlunoService: AtividadeAlunoService,
    private turmaService: TurmasService,
    private alunoService: AlunoService,
    private atividadeService: AtividadeService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
    private dataUtilService: DataUtilService,
    private autenticadorService: AutenticadorService
  ) {
  }


  ngOnInit() {

    this.limpar();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividadesSemTurma = atividades.filter(a => !a.idTurma);
      this.carregarOficinas();
    });

    this.turmaService.getAll().subscribe((turmas: Turmas[]) => {
      this.turmas = turmas;
      this.carregarOficinas();
    });


    const idAtividadeAluno = this.activatedRoute.snapshot.queryParams.idAtividadeAluno ? this.activatedRoute.snapshot.queryParams.idAtividadeAluno : null;
    if (idAtividadeAluno) {
      this.isAtualizar = true;
      this.atividadeAlunoService.getById(idAtividadeAluno).subscribe((atividadeAluno: AtividadeAluno) => {
        this.atividadeAluno = atividadeAluno;
        this.filtro.aluno.id = this.atividadeAluno.aluno.id;

        if (this.atividadeAluno.atividade.idTurma) {
          this.tipoOficina = 'T';
        } else {
          this.tipoOficina = 'O';
        }
        this.carregarOficinas();
      });
    }

  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) { return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }

  private validarConflitosDeMatriculas(matriculasRealizadas: AtividadeAluno[]): boolean {
    this.conflitos = [];

    const matriculas        = [this.atividadeAluno];
    const outrasMatriculas  = matriculasRealizadas.filter(m => m.id !== this.atividadeAluno.id);
    
    matriculas.forEach(oficina => {
      let temp: any[] = outrasMatriculas.filter(om => ((om.atividade.domingo && oficina.atividade.domingo) || 
                                                       (om.atividade.segunda && oficina.atividade.segunda) || 
                                                       (om.atividade.terca   && oficina.atividade.terca)   || 
                                                       (om.atividade.quarta  && oficina.atividade.quarta)  || 
                                                       (om.atividade.quinta  && oficina.atividade.quinta)  || 
                                                       (om.atividade.sexta   && oficina.atividade.sexta)   || 
                                                       (om.atividade.sabado  && oficina.atividade.sabado)) 
                                                      &&
                                                      (
                                                        oficina.atividade.horaInicio >= om.atividade.horaInicio && oficina.atividade.horaInicio <= om.atividade.horaFim 
                                                        || 
                                                        oficina.atividade.horaFim >= om.atividade.horaInicio && oficina.atividade.horaFim <= om.atividade.horaFim
                                                      )
                                                      &&
                                                      this.dataUtilService.isEntreDatasTruncada( oficina.dataInicioAtividade, oficina.dataDesvinculacao, om.dataInicioAtividade, om.dataDesvinculacao)
                                                      );  
     
      if(temp.length > 0) {
        this.conflitos.push({oficina: oficina, conflitos: temp});  
      }                                         
    });

    return this.conflitos.length > 0;
  }

  cadastrar() {
    if (!this.validarDatas() ) { return; }

    this.atividadeAlunoService.getAllByAlunoAndInstituicao(this.atividadeAluno.aluno.id)
    .subscribe((matriculas: AtividadeAluno[]) => {
      let hasDataMatriculaConflitando = this.validarConflitosDeMatriculas(matriculas);

      if(hasDataMatriculaConflitando) {
        this.toastService.showAlerta('Essa matrícula está conflitando com outras matrículas no mesmo período.');
      } else {
        this.atividadeAlunoService.cadastrar(this.atividadeAluno).subscribe(
          (atividadeAlunoSalva: AtividadeAluno) => {

          this.toastService.showSucesso('Matricula do aluno cadastrada com sucesso!');
          this.autenticadorService.revalidarSessao();

          this.atividadeAlunoService.getById(atividadeAlunoSalva.id)
          .subscribe((atividadeAluno: AtividadeAluno) => {          
            Object.assign(this.atividadeAluno, atividadeAluno);
          });
        });
      }
    });
  }




  validarDatas(): boolean {
    const dataInicioAtividade     = this.dataUtilService.getValorByDate(this.atividadeAluno.atividade.dataInicio);
    const dataFimAtividade        = this.dataUtilService.getValorByDate(this.atividadeAluno.atividade.dataFim);

    const dataIncioMatricula          = this.dataUtilService.getValorByDate(this.atividadeAluno.dataInicioAtividade);
    const dataDesvinculacaoMatricula  = this.dataUtilService.getValorByDate(this.atividadeAluno.dataDesvinculacao);

    
    if (dataIncioMatricula && dataIncioMatricula.getTime() < dataInicioAtividade.getTime()) {
      this.toastService.showAlerta('A data de início informada não pode ser menor que a data de início da atividade selecionada.');
      return false;
    }

    if (dataFimAtividade) {
      if (dataIncioMatricula && dataIncioMatricula.getTime() > dataFimAtividade.getTime()) {
        this.toastService.showAlerta('A data de início informada não pode ser menor que a data de início da atividade selecionada.');
        return false;
      }
    }

    if (dataFimAtividade && dataDesvinculacaoMatricula &&
        dataDesvinculacaoMatricula.getTime() > dataFimAtividade.getTime()) {
      this.toastService.showAlerta('A data de desvinculação informada não pode ser maior que a data de fim da atividade selecionada.');
      return false;
    }

    if (dataDesvinculacaoMatricula &&
        dataDesvinculacaoMatricula.getTime() < dataInicioAtividade.getTime()) {
      this.toastService.showAlerta('A data de desvinculação informada não pode ser menor que a data de início da atividade selecionada.');
      return false;
    }

    if (dataDesvinculacaoMatricula && dataIncioMatricula &&
      dataDesvinculacaoMatricula.getTime() < dataIncioMatricula.getTime()) {
      this.toastService.showAlerta('A data de desvinculação não pode ser menor que a data de inicio.');
      return false;
    }

    return true;
  }


  limpar() {
    this.atividadeAluno = new AtividadeAluno();
    this.atividadeAluno.aluno = new Aluno();
    this.atividadeAluno.atividade = new Atividade();
    this.tipoOficina = null;

    this.filtro = new FilterAlunos();
    this.filtro.aluno = new ComboAluno();
  }

  cancelar() {
    this.router.navigate(['atividadealuno']);
  }


  atualizar() {
    if (!this.validarDatas() ) { return; }

    this.atividadeAlunoService.getAllByAlunoAndInstituicao(this.atividadeAluno.aluno.id)
    .subscribe((matriculas: AtividadeAluno[]) => {
      let hasDataMatriculaConflitando = this.validarConflitosDeMatriculas(matriculas);

      if(hasDataMatriculaConflitando) {
        this.toastService.showAlerta('Essa matrícula está conflitando com outras matrículas no mesmo período.');
      } else {
        this.atividadeAlunoService.alterar(this.atividadeAluno).subscribe(() => {
          this.toastService.showSucesso('Matricula do aluno atualizada com sucesso!');
          this.autenticadorService.revalidarSessao();

          this.atividadeAlunoService.getById(this.atividadeAluno.id)
          .subscribe((atividadeAluno: AtividadeAluno) => {          
            Object.assign(this.atividadeAluno, atividadeAluno);
          });
        });
      }
    });
  }


  mostrarDadosAluno(idAluno) {
    this.alunoService.getById(idAluno).subscribe((aluno: Aluno) => {
      this.atividadeAluno.aluno = aluno;  
    });
  }

  mostrarDadosAtividade(idAtividade) {
    this.atividadeAluno.atividade = _.cloneDeep(_.find(this.atividades, (a: Atividade) => a.id === idAtividade));
  }

  carregarOficinas() {
    this.atividades = [];
    if (this.isTurma() && this.atividadeAluno.atividade.idTurma && this.turmas) {
      const turma = this.turmas.find(t => t.id === this.atividadeAluno.atividade.idTurma);
      this.atividades = turma.oficinas;
    }

    if (this.isOficina()) {
      this.atividades = this.atividadesSemTurma;
    }
  }

  isTurma() {
    return this.tipoOficina === 'T';
  }

  isOficina() {
    return this.tipoOficina === 'O';
  }



  getDadosTurma(turma: Turmas) {
    return turma.descricao + (turma.programa ? ' - Programa: ' + turma.programa.nome : '') + 
           (turma.projeto ? ' - Projeto: ' + turma.projeto.nome : '') +
           ' - Turno: ' + turma.turno + ' - Início: ' + new Date(turma.dataInicioTurma).toLocaleDateString();
  }

  getDadosConflito(reg: AtividadeAluno) {
    const dias = [];

    reg.atividade.domingo ? dias.push('Domingo') : ''; 
    reg.atividade.segunda ? dias.push('Segunda') : '';
    reg.atividade.terca ? dias.push('Terça') : ''; 
    reg.atividade.quarta ? dias.push('Quarta') : ''; 
    reg.atividade.quinta ? dias.push('Quinta') : ''; 
    reg.atividade.sexta ? dias.push('Sexta') : ''; 
    reg.atividade.sabado ? dias.push('Sábado') : ''; 

    return dias.join(', ');
  }

  getPeriodoConflito(atividade: AtividadeAluno) {
    if(!atividade.dataDesvinculacao) {
      return 'a partir de ' + this.dataUtilService.getDataTruncata(atividade.dataInicioAtividade).toLocaleDateString();
    }
    
    return this.dataUtilService.getDataTruncata(atividade.dataInicioAtividade).toLocaleDateString() + ' até ' +
           this.dataUtilService.getDataTruncata(atividade.dataDesvinculacao).toLocaleDateString()
  }


  onValorChange(registro: any) {
    this.filtro.aluno = registro;
    if(registro) {
      this.mostrarDadosAluno(registro.id);
    }
  }

}
