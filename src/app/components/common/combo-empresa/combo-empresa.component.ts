import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';
import * as _ from 'lodash';
import { ComboEmpresa } from 'src/app/core/combo-empresa';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';


@Component({
  selector: 'combo-empresa',
  templateUrl: './combo-empresa.component.html',
  styleUrls: ['./combo-empresa.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm },
  { provide: ControlContainer, useExisting: forwardRef(() => NgModelGroup) }],
})
export class ComboEmpresaComponent implements OnInit {

  @Input() showDisplayId;
  @Input() obrigatorio;
  @Input() selecionado;
  @Input() desabilitado;
  @Input() label;
  @Input() fxFlexOffset = "20px";

  @Output() valorChange = new EventEmitter();

  dados = [];
  data: any = {};

  constructor(private empresaService: EmpresaService) {
  }

  ngOnInit(): void {
    this.data = Date.now();

    setTimeout(() => {
      this.empresaService.getAllByCombo().subscribe((empresas: ComboEmpresa[]) => {
        this.dados = empresas;
        this.preencherCombo();

        this.dados.forEach(a => a.nomeRazaoSocial = a.nomeRazaoSocial);
        this.dados.sort((a, b) => {
          if (a.nomeRazaoSocial > b.nomeRazaoSocial) { return 1; }
          if (a.nomeRazaoSocial < b.nomeRazaoSocial) { return -1; }
          return 0;
        });
      });
    }, 0);

  }

  private preencherCombo() {
    if (this.selecionado && this.selecionado.id) {
      this.selecionado = _.find(this.dados, { id: this.selecionado.id });
    }
  }

  onValorChange(registro: any) {
    this.valorChange.emit(registro);
    this.preencherCombo();
  }
}
