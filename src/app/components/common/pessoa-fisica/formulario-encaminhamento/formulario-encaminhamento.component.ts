import { Component, OnInit, Input } from '@angular/core';
import { EncaminhamentoAluno } from 'src/app/core/encaminhamento-aluno';
import { Acesso } from 'src/app/core/acesso';
import { EntidadesSociais } from 'src/app/core/entidades-sociais';
import { ControlContainer, NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { DataUtilService } from 'src/app/services/commons/data-util.service';

@Component({
  selector: 'formulario-encaminhamento',
  templateUrl: './formulario-encaminhamento.component.html',
  styleUrls: ['./formulario-encaminhamento.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormularioEncaminhamentoComponent implements OnInit {

  @Input() encaminhamentos: EncaminhamentoAluno[];
  @Input() encaminhamento: EncaminhamentoAluno;
  @Input() index: number;
  @Input() perfilAcesso: Acesso;
  @Input() entidadesSociais: EntidadesSociais[];

  pinEntidadeSocial     = Date.now();
  pinDataEncaminhamento = Date.now();
  pinDescricao          = Date.now();

  constructor(private dataUtilService: DataUtilService) { }

  ngOnInit(): void {
  }

  deletar() {
    this.encaminhamentos.splice(this.index, 1);
  }


  carregarDadosEntidadeSocial(){
    if (this.encaminhamento.entidadeSocial.id) {
      this.encaminhamento.entidadeSocial = _.cloneDeep(_.find(this.entidadesSociais,  (f: EntidadesSociais) => f.id === this.encaminhamento.entidadeSocial.id));
    }
  }

  onMascaraDataInput(event) {
    return this.dataUtilService.onMascaraDataInput(event);
  }
}
