import { GrupoModulo } from './../../../core/grupo-modulo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';

@Component({
  selector: 'formulario-grupo-modulo',
  templateUrl: './formulario-grupo-modulo.component.html',
  styleUrls: ['./formulario-grupo-modulo.component.css'],
  viewProviders:  [{ provide:  ControlContainer, useExisting:  NgForm }]
})
export class FormularioGrupoModuloComponent implements OnInit {

  pinDescricao = Date.now();
  pinNome = Date.now();
  pinModulo = Date.now();
  pinPerfilAcesso = Date.now();

  @Input() perfilAcesso: PerfilAcesso;
  @Input() grupoModulo: GrupoModulo;
  @Input() listaPerfilAcesso: PerfilAcesso[];
  @Output() onDeletar = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  getPerfilAcesso(idPerfilAcesso) {
    this.grupoModulo.perfilAcesso = _.find(this.listaPerfilAcesso, p => p.id === idPerfilAcesso);
  }

  deletar() {
    this.onDeletar.emit(this.grupoModulo);
  }

}
