import { Component, EventEmitter, forwardRef, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';
import * as _ from 'lodash';
import { ComboEmpresa } from 'src/app/core/combo-empresa';
import { CnpjPipe } from 'src/app/pipes/cnpj.pipe';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';


@Component({
  selector: 'combo-empresa',
  templateUrl: './combo-empresa.component.html',
  styleUrls: ['./combo-empresa.component.css'],
  providers: [CnpjPipe],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm },
  { provide: ControlContainer, useExisting: forwardRef(() => NgModelGroup) }],
})
export class ComboEmpresaComponent implements OnInit {

  @Input() showDisplayId;
  @Input() obrigatorio;
  @Input() selecionado;
  @Input() desabilitado;
  @Input() label;
  @Input() campoPesquisavel = 'nomeRazaoSocial';
  @Input() tipoEmpresa;
  @Input() fxFlexOffset = "20px";

  @Output() valorChange = new EventEmitter();

  dados = [];
  data: any = {};

  constructor(private empresaService: EmpresaService,
              private cnpjPipe: CnpjPipe) {
  }

  ngOnInit(): void {
    this.data = Date.now();

    setTimeout(() => {
      let $_evento;
      
      if(!!this.tipoEmpresa) {
        $_evento = this.empresaService.getAllPorTipo(this.tipoEmpresa);        
      } else {
        $_evento = this.empresaService.getAll();        
      }

      $_evento.subscribe((empresas: ComboEmpresa[]) => {
        this.dados = empresas;
        this.preencherCombo();

        this.dados.forEach(a => {
          a.nomeRazaoSocial = a.nomeRazaoSocial;
          a.cnpj = this.cnpjPipe.transform(a.cnpj);
        } );

        
        this.dados.sort((a, b) => {
          if (a.nomeRazaoSocial > b.nomeRazaoSocial) { return 1; }
          if (a.nomeRazaoSocial < b.nomeRazaoSocial) { return -1; }
          return 0;
        });
      });

    }, 0);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["selecionado"] && this.selecionado && this.selecionado.id) {
      this.preencherCombo();
    }
  }

  private preencherCombo() {
    if (this.selecionado && this.selecionado.id && this.dados.length) {
      this.selecionado = _.find(this.dados, { id: this.selecionado.id });
    }
  }

  onValorChange(registro: any) {
    this.valorChange.emit(registro);
    this.preencherCombo();
  }
}
