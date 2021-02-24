import { Component, EventEmitter, forwardRef, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';
import * as _ from 'lodash';
import { ComboPrograma } from 'src/app/core/combo-programa';
import { ComboProjeto } from 'src/app/core/combo-projeto';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';



@Component({
  selector: 'combo-projeto',
  templateUrl: './combo-projeto.component.html',
  styleUrls: ['./combo-projeto.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm },
                  { provide: ControlContainer, useExisting: forwardRef(() => NgModelGroup) }],  
})
export class ComboProjetoComponent implements OnInit {

  @ViewChild('comboProjeto', {static: false}) comboProjeto;
  
  @Input() showDisplayId;
  @Input() obrigatorio;
  @Input() selecionado;
  @Input() desabilitado;
  
  @Output() valorChange = new EventEmitter();
  
  dados = [];
  data: any = {};

  constructor(private projetoService: ProjetoService) { 
  }

  ngOnInit(): void {
    this.data = Date.now();
    
    setTimeout(() => {
      this.projetoService.getAllCombo().subscribe((projetos: ComboProjeto[]) => {
        this.dados = projetos;
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
