import { Component, OnInit, Input } from '@angular/core';
import { Aluno } from 'src/app/core/aluno';
import { Unidade } from 'src/app/core/unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { CondicoesMoradia } from 'src/app/core/condicoes-moradia';
import { NiveisTurmasService } from 'src/app/services/niveis-turmas/niveis-turmas.service';
import { NiveisTurmas } from 'src/app/core/niveis-turmas';
import { ControlContainer, NgForm } from '@angular/forms';

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

  sim_nao: any[] = [
    {tipo: 'Sim', flag: 'S'},
    {tipo: 'Não', flag: 'N'}
  ];

  isEditarMatricula = true;

  constructor(
    private unidadeService: UnidadeService,
    private niveisTurmasService: NiveisTurmasService
    ) { }

  ngOnInit() {
    this.aluno.unidade = new Unidade();
    this.aluno.nivelTurma = new NiveisTurmas();

    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: Unidade[])=> {
      this.unidades = unidades;
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
