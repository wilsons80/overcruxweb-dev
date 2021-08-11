import { Component, EventEmitter, forwardRef, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';
import * as _ from 'lodash';
import { PlanosContas } from 'src/app/core/planos-contas';
import { CategoriasContabeisService } from 'src/app/services/categorias-contabeis/categorias-contabeis.service';


@Component({
  selector: 'combo-rubrica',
  templateUrl: './combo-rubrica.component.html',
  styleUrls: ['./combo-rubrica.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm },
                  { provide: ControlContainer, useExisting: forwardRef(() => NgModelGroup) }],  
})
export class ComboRubricaComponent implements OnInit {

  @ViewChild('comboRubrica', {static: false}) comboRubrica;
  
  @Input() itens;
  @Input() showDisplayId;
  @Input() obrigatorio;
  @Input() selecionado;
  @Input() desabilitado;
  @Input() placeholder;
  @Input() hasSintetica;
  @Input() label;
  
  @Output() valorChange = new EventEmitter();
  
  dados = [];
  data = Date.now();

  constructor(private categoriasContabeisService: CategoriasContabeisService) { 
  }

  ngOnInit(): void {
    setTimeout(() => {

      if(!!this.itens){
        this.dados = this.itens;
      } else {
        let _planoConta$;
  
        if(!!this.hasSintetica) {
          _planoConta$ = this.categoriasContabeisService.getAllView(this.hasSintetica) ; 
        } else {
          _planoConta$ = this.categoriasContabeisService.getAllViewPlanosContas();
        }
  
        _planoConta$.subscribe((planosContas: PlanosContas[]) => {
          this.dados = planosContas;
          this.preencherCombo();
        })
      }

    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["selecionado"] && this.selecionado && this.selecionado.id) {
      this.preencherCombo();
    }
  }

  private preencherCombo(){
    if (this.selecionado && this.selecionado.id && this.dados.length) {
      this.selecionado = _.find(this.dados, { id: this.selecionado.id});
    }
  } 
  
  onValorChange(registro: any) {   
    this.valorChange.emit(registro); 
    this.preencherCombo();
  }

}
