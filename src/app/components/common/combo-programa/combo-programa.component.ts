import { Component, EventEmitter, forwardRef, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';
import * as _ from 'lodash';
import { ComboPrograma } from 'src/app/core/combo-programa';
import { ProgramaService } from 'src/app/services/programa/programa.service';



@Component({
  selector: 'combo-programa',
  templateUrl: './combo-programa.component.html',
  styleUrls: ['./combo-programa.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm },
                  { provide: ControlContainer, useExisting: forwardRef(() => NgModelGroup) }],  
})
export class ComboProgramaComponent implements OnInit {

  @ViewChild('comboPrograma', {static: false}) comboPrograma;
  
  @Input() showDisplayId;
  @Input() obrigatorio;
  @Input() selecionado;
  @Input() desabilitado;
  
  @Output() valorChange = new EventEmitter();
  
  dados = [];
  data: any = {};

  constructor(private programaService: ProgramaService) { 
  }

  ngOnInit(): void {
    this.data = Date.now();
    
    setTimeout(() => {
      this.programaService.getAllCombo().subscribe((programas: ComboPrograma[]) => {
        this.dados = programas;
        this.preencherCombo();
        
        this.dados.forEach(a => a.nome = a.nome);
        this.dados.sort((a,b) => {
          if (a.nome > b.nome) {return 1;}
          if (a.nome < b.nome) {return -1;}
          return 0;
        });
      });
    }, 0)

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["selecionado"] && this.selecionado &&  this.selecionado.id) {
      this.preencherCombo();
    }
  }

  private preencherCombo(){
    if (this.selecionado && this.selecionado && this.selecionado.id) {
      this.selecionado = _.find(this.dados, { id: this.selecionado.id});
    }
  } 
  
  onValorChange(registro: any) {
    this.valorChange.emit(registro);
    this.preencherCombo();
  }


}
