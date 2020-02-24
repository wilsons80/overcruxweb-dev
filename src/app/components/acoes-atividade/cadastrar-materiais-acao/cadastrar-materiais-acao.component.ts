import { Component, OnInit, Input } from '@angular/core';
import { Acoes } from 'src/app/core/acoes';
import { MateriaisAcao } from 'src/app/core/materiais-acao';
import { Material } from 'src/app/core/material';
import { MaterialService } from 'src/app/services/material/material.service';
import * as _ from 'lodash';

@Component({
  selector: 'cadastrar-materiais-acao',
  templateUrl: './cadastrar-materiais-acao.component.html',
  styleUrls: ['./cadastrar-materiais-acao.component.css']
})
export class CadastrarMateriaisAcaoComponent implements OnInit {

  @Input() acao: Acoes;

  materialAcao: MateriaisAcao = new MateriaisAcao();
  materiais: Material[];

  isAtualizar = false;

  constructor(private materialService: MaterialService) { }

  ngOnInit(): void {
    this.initObjeto();

    this.materialService.getAllCombo().subscribe((materiais: Material[]) => {
      this.materiais = materiais;
    });
  }


  atualizarMaterial(materialAcao: MateriaisAcao) {
    this.isAtualizar = true;
    this.materialAcao = materialAcao;
  }


  initObjeto() {
    this.materialAcao = new MateriaisAcao();
    this.materialAcao.material = new Material();
  }


  adicionar() {
      if (!this.acao.materiaisAcao) {
        this.acao.materiaisAcao = [];
      }

      const materiaisAcao = new MateriaisAcao();
      Object.assign(materiaisAcao, this.materialAcao);
      materiaisAcao.idAcao = this.acao.id;

      this.acao.materiaisAcao.push(materiaisAcao);
      this.initObjeto();

  }

  atualizar() {
    const index = this.acao.materiaisAcao.indexOf(this.acao.materiaisAcao.find(col => col.id === this.materialAcao.id));
    this.acao.materiaisAcao.splice(index, 1, this.materialAcao);
    this.isAtualizar = false;
    this.initObjeto();
  }

  cancelar() {
    this.initObjeto();
    this.isAtualizar = false;
  }


  carregarDadosMaterial() {
    if (this.materialAcao.material.id) {
      this.materialAcao.material = _.cloneDeep(_.find(this.materiais,  (f: Material) => f.id === this.materialAcao.material.id));
    }
  }

}
