import { AtividadeAlunoService } from 'src/app/services/atividade-aluno/atividade-aluno.service';
import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { TurmasService } from './../../../services/turmas/turmas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Acesso } from 'src/app/core/acesso';
import { Aluno } from 'src/app/core/aluno';
import { Atividade } from 'src/app/core/atividade';
import { Turmas } from 'src/app/core/turmas';
import { AlunosTurma } from 'src/app/core/alunos-turma';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MatriculaService } from 'src/app/services/matricula/matricula.service';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { tap } from 'rxjs/operators';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { AutenticadorService } from 'src/app/services/autenticador/autenticador.service';


@Component({
  selector: 'cadastrar-matricula',
  templateUrl: './cadastrar-matricula.component.html',
  styleUrls: ['./cadastrar-matricula.component.css']
})
export class CadastrarMatriculaComponent implements OnInit {

  conflitos = [];

  matricula: AlunosTurma = new AlunosTurma();
  alunos: Aluno[];
  aluno: Aluno = new Aluno();

  turmas: Turmas[];
  turma: Turmas = new Turmas();

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;
  localMatricula = null;

  oficinasSelecionadas = new FormControl();

  constructor(
    private matriculasService: MatriculaService,
    private atividadeAlunoService: AtividadeAlunoService,
    private dialog: MatDialog,
    private turmasService: TurmasService,
    private alunoService: AlunoService,
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

    this.turmasService.getAll().subscribe((turmas: Turmas[]) => {
      this.turmas = turmas;
    });

    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
    });

    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.matriculasService.getById(id).subscribe((matricula: AlunosTurma) => {
        this.matricula = matricula;

        this.matricula.oficinas.sort((a,b) => {
          if (a.dataInicioAtividade > b.dataInicioAtividade) {return 1;}
          if (a.dataInicioAtividade < b.dataInicioAtividade) {return -1;}
          return 0;
          });
      });
    }

    
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) { return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }

  cadastrar() {
    if (!this.validarDatasInicioMatriculadasNaTurma() ) { return; }

    this.atividadeAlunoService.getAllByAlunoAndInstituicao(this.matricula.aluno.id)
    .subscribe((matriculas: AtividadeAluno[]) => {
      let hasDataMatriculaConflitando = this.validarConflitosDeMatriculas(matriculas);

      if(hasDataMatriculaConflitando) {
        this.toastService.showAlerta('Essas matrículas estão conflitando com outras matrículas no mesmo período.');
      } else {
        this.matriculasService.cadastrar(this.matricula).subscribe(() => {
          this.toastService.showSucesso('Matricula do aluno cadastrada com sucesso!');
          this.autenticadorService.revalidarSessao();

          this.matriculasService.getById(this.matricula.id)
          .subscribe((matricula: AlunosTurma) => {          
            Object.assign(this.matricula, matricula);
          });
        });
      }
    });
  }

  validarDatasInicioMatriculadasNaTurma(): boolean {
    let dataValida = true;

    const dataInicioMatricula = this.dataUtilService.getDataTruncata(this.matricula.dataInicio);
    const dataInicioTurma     = this.dataUtilService.getDataTruncata(this.matricula.turma.dataInicioTurma);

    if(dataInicioMatricula.getTime() < dataInicioTurma.getTime()) {
      this.toastService.showAlerta('A data de início da matricula (' + dataInicioMatricula.toLocaleDateString() 
                                   +') é menor que a data de início da turma ('+ dataInicioTurma.toLocaleDateString() +')');
      return;
    }

    if (this.matricula.oficinas) {
      this.matricula.oficinas.forEach(oficina => {
        const dataInicio = this.dataUtilService.getDataTruncata(oficina.dataInicioAtividade);
        if (dataInicio.getTime() < dataInicioMatricula.getTime()) {
           this.toastService.showAlerta(oficina.atividade.descricao.toUpperCase() +' não pode ter data de início menor que a data de início da matrícula.');
           dataValida = false;
        }
      });
    }
    return dataValida;
  }


  private validarConflitosDeMatriculas(matriculas: AtividadeAluno[]): boolean {
    this.conflitos = [];

    const matriculasTurma   = matriculas.filter(m => m.atividade.idTurma === this.matricula.turma.id);
    const outrasMatriculas  = matriculas.filter(m => m.atividade.idTurma !== this.matricula.turma.id);
    
    matriculasTurma.forEach(oficina => {
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


  atualizar() {
    if (!this.validarDatasInicioMatriculadasNaTurma() ) { return; }

    this.atividadeAlunoService.getAllByAlunoAndInstituicao(this.matricula.aluno.id)
    .subscribe((matriculas: AtividadeAluno[]) => {
      let hasDataMatriculaConflitando = this.validarConflitosDeMatriculas(matriculas);

      if(hasDataMatriculaConflitando) {
        this.toastService.showAlerta('Essas matrículas estão conflitando com outras matrículas no mesmo período.');
      } else {
        this.matriculasService.alterar(this.matricula).subscribe(() => {
          this.toastService.showSucesso('Matricula do aluno atualizada com sucesso!');
          this.autenticadorService.revalidarSessao();

          this.matriculasService.getById(this.matricula.id)
          .subscribe((matricula: AlunosTurma) => {          
            Object.assign(this.matricula, matricula);
          });
        });
      }
    });
  }

  limpar() {
    this.matricula = new AlunosTurma();
    this.matricula.aluno = new Aluno();
    this.matricula.turma = new Turmas();
    this.matricula.oficinas = [];
    this.aluno = new Aluno();
    this.turma = new Turmas();
    this.localMatricula = null;
  }

  cancelar() {
    this.router.navigate(['matriculas']);
  }
  
  mostrarDadosAluno(idAluno) {
    this.matricula.aluno = _.cloneDeep(_.find(this.alunos, (a: Aluno) => a.id === idAluno));
  }

  carregarDadosTurma() {
    if (this.matricula.turma.id) {
      this.matricula.turma = _.cloneDeep(_.find(this.turmas, (t: Turmas) => t.id === this.matricula.turma.id));
    }
  }

  novaMatricula() {
    const nova: AtividadeAluno = new AtividadeAluno();
    nova.aluno = this.matricula.aluno;
    nova.atividade = new Atividade();
    this.matricula.oficinas.push(nova);
  }

  deletarOficina(oficina: AtividadeAluno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a matrícula ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        const index = this.matricula.oficinas.indexOf( this.matricula.oficinas.find(reg => reg === oficina));
        if (index >= 0) {
          this.matricula.oficinas.splice(index, 1);
    
          if (oficina.id) {
            this.atividadeAlunoService.excluir(oficina.id).subscribe(() => {
              this.toastService.showSucesso('Matrícula apagada com sucesso.');
            });
          }
        }
      } else {
        dialogRef.close();
      }
    });
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

}
