import { Atividade } from 'src/app/core/atividade';
import { Material } from 'src/app/core/material';
import { MateriaisAtividade } from 'src/app/core/materiais-atividade';
import { Component, OnInit, Input } from '@angular/core';
import { MaterialService } from 'src/app/services/material/material.service';
import * as _ from 'lodash';

@Component({
  selector: 'cadastrar-materiais',
  templateUrl: './cadastrar-materiais.component.html',
  styleUrls: ['./cadastrar-materiais.component.css']
})
export class CadastrarMateriaisComponent implements OnInit {

  @Input() oficina: Atividade;
  materialAtividade: MateriaisAtividade = new MateriaisAtividade();

  listaDeMateriais: Material[] = [];

  isAtualizar = false;
  isMostrarFuncionario = false;

  formasPagamento = [
    {tipo: 'D', descricao: 'Dinheiro'},
    {tipo: 'C', descricao: 'Cartão'},
    {tipo: 'D', descricao: 'Débito'},
    {tipo: 'F', descricao: 'Desconto em folha'},
  ];

  constructor(
    private materialService: MaterialService
  ) { }

  ngOnInit() {
    this.materialAtividade.material = new Material();
    this.materialService.getAll().subscribe((materiais: Material[]) => this.listaDeMateriais = materiais)
  }


  zerarCombos() {
    this.materialAtividade = new MateriaisAtividade();
    this.materialAtividade.material = new Material();
    this.isMostrarFuncionario = false;
  }

  adicionar() {
    const materialAtividade = new MateriaisAtividade();
    Object.assign(materialAtividade, this.materialAtividade);

    if (!this.oficina.materiaisAtividade) {
      this.oficina.materiaisAtividade = [];
    }
    this.oficina.materiaisAtividade.push(materialAtividade);
    this.zerarCombos();
  }


  montarMaterial(idMaterial: number) {
    this.materialAtividade.material = _.cloneDeep(_.find(this.listaDeMateriais, (a: Material) => a.id === idMaterial));
  }

  atualizar() {
    const index = this.oficina.materiaisAtividade.indexOf(this.oficina.materiaisAtividade.find(col => col.id === this.materialAtividade.id));
    this.oficina.materiaisAtividade.splice(index, 1, this.materialAtividade);

    this.isAtualizar = false;
    this.zerarCombos();
  }

  atualizarMaterial(materialAtividade: MateriaisAtividade) {
    this.isAtualizar = true;
    this.materialAtividade = materialAtividade;
  }

  cancelar() {
    this.zerarCombos();
    this.isAtualizar = false;
  }


  setMaterial(id: number){
    this.materialAtividade.material = _.cloneDeep(_.find(this.listaDeMateriais, (c: Material) => c.id === id));
  }


}
