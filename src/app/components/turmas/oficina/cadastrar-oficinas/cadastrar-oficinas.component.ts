import { TurmasService } from './../../../../services/turmas/turmas.service';
import { Component, OnInit, Input } from '@angular/core';
import { Turmas } from 'src/app/core/turmas';
import { Atividade } from 'src/app/core/atividade';
import { Unidade } from 'src/app/core/unidade';
import { PlanosAcao } from 'src/app/core/planos-acao';
import { Projeto } from 'src/app/core/projeto';
import { Programa } from 'src/app/core/programa';
import * as _ from 'lodash';

@Component({
  selector: 'cadastrar-oficinas',
  templateUrl: './cadastrar-oficinas.component.html',
  styleUrls: ['./cadastrar-oficinas.component.css']
})
export class CadastrarOficinasComponent implements OnInit {

  @Input() turma: Turmas;
  oficina: Atividade = new Atividade();

  isAtualizar = false;
  turmas: Turmas[];

  constructor(private turmaService: TurmasService) { }

  ngOnInit(): void {
    this.initObjeto();

    this.turmaService.getAll().subscribe((turmas: Turmas[]) => {
      this.turmas = turmas;
    });
  }


  atualizarOficina(oficina: Atividade) {
    this.isAtualizar = true;
    this.oficina = oficina;
  }


  initObjeto() {
    this.oficina = new Atividade();
    this.oficina.planosAcao = new PlanosAcao();
    this.oficina.projeto = new Projeto();
    this.oficina.programa = new Programa();
    this.oficina.unidade = new Unidade();
  }


  adicionar() {
      if (!this.oficina.colaboradoresAtividade) {
        this.oficina.colaboradoresAtividade = [];
      }
      if (!this.oficina.materiaisAtividade) {
        this.oficina.materiaisAtividade = [];
      }

      const oficina = new Atividade();
      Object.assign(oficina, this.oficina);

      this.turma.oficinas.push(oficina);
      this.initObjeto();

  }

  atualizar() {
    const index = this.turma.oficinas.indexOf(this.turma.oficinas.find(col => col.id === this.oficina.id));
    this.turma.oficinas.splice(index, 1, this.oficina);
    this.isAtualizar = false;
    this.initObjeto();
  }

  cancelar() {
    this.initObjeto();
    this.isAtualizar = false;
  }

}
