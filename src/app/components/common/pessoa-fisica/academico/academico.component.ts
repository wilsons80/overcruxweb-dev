import { Component, OnInit, Input } from '@angular/core';
import { Aluno } from 'src/app/core/aluno';
import { Unidade } from 'src/app/core/unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { CondicoesMoradia } from 'src/app/core/condicoes-moradia';
import { NiveisTurmasService } from 'src/app/services/niveis-turmas/niveis-turmas.service';
import { NiveisTurmas } from 'src/app/core/niveis-turmas';
import { ControlContainer, NgForm } from '@angular/forms';
import { MotivoDesligamento } from 'src/app/core/motivo-desligamento';
import { TiposPublicoPrioritario } from 'src/app/core/tipos-publico-prioritario';
import { MotivoDesligamentoService } from 'src/app/services/motivo-desligamento/motivo-desligamento.service';
import { TiposPublicoPrioritarioService } from 'src/app/services/tipos-publico-prioritario/tipos-publico-prioritario.service';
import * as _ from 'lodash';
import { Projeto } from 'src/app/core/projeto';
import { ComboProjeto } from 'src/app/core/combo-projeto';
import { ComboPrograma } from 'src/app/core/combo-programa';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { DataUtilService } from 'src/app/services/commons/data-util.service';

@Component({
  selector: 'academico',
  templateUrl: './academico.component.html',
  styleUrls: ['./academico.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class AcademicoComponent implements OnInit {

  @Input() aluno: Aluno;

  unidades: Unidade[];
  niveisTurmas: NiveisTurmas[];
  listaTiposPublicoPrioritario:TiposPublicoPrioritario[];
  listaMotivosDesligamento:MotivoDesligamento[];

  sim_nao: any[] = [
    {tipo: 'Sim', flag: 'S'},
    {tipo: 'Não', flag: 'N'}
  ];

  todosProjetos: Projeto[];
  comboProjetos: ComboProjeto[];
  comboProgramas: ComboPrograma[];
  
  isEditarMatricula = true;

  constructor(
    private unidadeService: UnidadeService,
    private niveisTurmasService: NiveisTurmasService,
    private tiposPublicoPrioritarioService:TiposPublicoPrioritarioService,
    private motivoDesligamentoService:MotivoDesligamentoService,
    private projetoService: ProjetoService,
    private programaService: ProgramaService,
    private dataUtilService: DataUtilService
    ) { }

  ngOnInit() {
    this.aluno.unidade = new Unidade();
    this.aluno.nivelTurma = new NiveisTurmas();
    this.aluno.motivoDesligamento = new MotivoDesligamento();
    this.aluno.tiposPublicoPrioritario = new TiposPublicoPrioritario();

    this.unidadeService.getAllUnidadeParaCombo().subscribe((unidades: Unidade[])=> {
      this.unidades = unidades;
    });

    this.tiposPublicoPrioritarioService.getAll().subscribe((listaTiposPublicoPrioritario: TiposPublicoPrioritario[])=> {
      this.listaTiposPublicoPrioritario = listaTiposPublicoPrioritario;
    });
    
    this.motivoDesligamentoService.getAll().subscribe((listaMotivosDesligamento: MotivoDesligamento[])=> {
      this.listaMotivosDesligamento = listaMotivosDesligamento;
    });

    this.niveisTurmasService.getAll()
      .subscribe((niveisTurmas: NiveisTurmas[]) => {
        this.niveisTurmas = niveisTurmas;
    });

    this.projetoService.getAllIntituicaoLogada().subscribe((projetos: Projeto[]) => {
      this.todosProjetos    = projetos;
      this.comboProjetos    = projetos;
    });

    this.programaService.getAllCombo().subscribe((programas: ComboPrograma[]) => {
      this.comboProgramas = programas;
    });
  }


  editarMatricula() {
    this.isEditarMatricula = !this.isEditarMatricula;
  }


  carregarPrograma(programa: ComboPrograma) {
    this.aluno.projeto = null;

    if(!programa) {
      this.comboProjetos = this.todosProjetos; 
      return;
    } 

    this.comboProjetos   = this.todosProjetos.filter(p => p.programa && p.programa.id === programa.id).map(p => {
      let combo = new ComboProjeto();
      combo.id   = p.id;
      combo.nome = p.nome;
      return combo;
    });
  }

  carregarProjeto(projeto: ComboProjeto) {
    if(!projeto) {
      this.aluno.projeto = null;
      return;
    }
  }

  onMascaraDataInput(event) {
    return this.dataUtilService.onMascaraDataInput(event);
  }
}
