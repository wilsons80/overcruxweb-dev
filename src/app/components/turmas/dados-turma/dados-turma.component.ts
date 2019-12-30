import { Turmas } from './../../../core/turmas';
import { Component, OnInit, Input } from '@angular/core';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { NiveisTurmasService } from 'src/app/services/niveis-turmas/niveis-turmas.service';
import { Projeto } from 'src/app/core/projeto';
import { NiveisTurmas } from 'src/app/core/niveis-turmas';
import { Programa } from 'src/app/core/programa';
import { Unidade } from 'src/app/core/unidade';
import { ControlContainer, NgForm } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'dados-turma',
  templateUrl: './dados-turma.component.html',
  styleUrls: ['./dados-turma.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DadosTurmaComponent implements OnInit {

  tipoHorario: any = [
    { id: 'F', descricao: 'FIXO' },
    { id: 'L', descricao: 'LIVRE' },
  ];

  localExecucao: any = [
    { id: 'I', descricao: 'INTERNA' },
    { id: 'E', descricao: 'EXTERNA' },
  ];

  turnos: any = [
    { id: 'M', descricao: 'MATUTINO' },
    { id: 'V', descricao: 'VESPERTINO' },
    { id: 'N', descricao: 'NOTURNO' },
    { id: 'O', descricao: 'OUTRO' },
  ];


  niveisTurma: NiveisTurmas[];
  projetos: Projeto[];
  programas: Programa[];
  unidades: Unidade[];

  @Input() turma: Turmas;

  constructor(
    private projetoService: ProjetoService,
    private programaService: ProgramaService,
    private niveisTurmasService: NiveisTurmasService,
    private unidadeService: UnidadeService
    ) { }

  ngOnInit() {

    this.niveisTurmasService.getAll().subscribe((niveisTurma: NiveisTurmas[]) => {
      this.niveisTurma = niveisTurma;
    });

    this.projetoService.getAll().subscribe((projetos: Projeto[]) => {
      this.projetos = projetos;
    });

    this.programaService.getAll().subscribe((programas: Programa[]) => {
      this.programas = programas;
    });

    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: Unidade[]) => {
      this.unidades = unidades;
    });


  }

  setNivelTurma(id: number){
    this.turma.niveisTurma = _.cloneDeep(_.find(this.niveisTurma, (c: NiveisTurmas) => c.id === id));
  }


  setUnidade(id: number){
    this.turma.unidade = _.cloneDeep(_.find(this.unidades, (c: Unidade) => c.idUnidade === id));
  }

  setProjeto(id: number){
    this.turma.projeto = _.cloneDeep(_.find(this.projetos, (c: Projeto) => c.id === id));
  }

  setPrograma(id: number){
    this.turma.programa = _.cloneDeep(_.find(this.programas, (c: Programa) => c.id === id));
  }
}
