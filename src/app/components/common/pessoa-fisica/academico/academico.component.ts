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

  isEditarMatricula = true;

  constructor(
    private unidadeService: UnidadeService,
    private niveisTurmasService: NiveisTurmasService,
    private tiposPublicoPrioritarioService:TiposPublicoPrioritarioService,
    private motivoDesligamentoService:MotivoDesligamentoService
    ) { }

  ngOnInit() {
    this.aluno.unidade = new Unidade();
    this.aluno.nivelTurma = new NiveisTurmas();
    this.aluno.motivoDesligamento = new MotivoDesligamento();
    this.aluno.tiposPublicoPrioritario = new TiposPublicoPrioritario();

    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: Unidade[])=> {
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
  }


  editarMatricula() {
    this.isEditarMatricula = !this.isEditarMatricula;
  }

}
