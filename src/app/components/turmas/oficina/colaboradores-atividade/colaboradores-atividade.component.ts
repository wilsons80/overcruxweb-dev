import { Atividade } from 'src/app/core/atividade';
import { Turmas } from 'src/app/core/turmas';
import { ColaboradoresAtividade } from './../../../../core/colaboradores-atividade';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'colaboradores-atividade',
  templateUrl: './colaboradores-atividade.component.html',
  styleUrls: ['./colaboradores-atividade.component.css']
})
export class ColaboradoresAtividadeComponent implements OnInit {

  @Input() oficina: Atividade;

  openFormCadastro = false;

  constructor() {
  }

  ngOnInit() {
  }

  onGetAdicionar(evento) {
    this.openFormCadastro = evento;
  }



}
