import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';
import { ComboFuncionario } from 'src/app/core/combo-funcionario';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import * as _ from 'lodash';


@Component({
  selector: 'combo-funcionario',
  templateUrl: './combo-funcionario.component.html',
  styleUrls: ['./combo-funcionario.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm },
                  { provide: ControlContainer, useExisting: forwardRef(() => NgModelGroup) }],   
})
export class ComboFuncionarioComponent implements OnInit {

  @Input() showDisplayId;
  @Input() obrigatorio;
  @Input() selecionado;
  @Input() desabilitado;
  
  @Output() valorChange = new EventEmitter();
  
  dados = [];
  data: any = {};

  constructor(private funcionarioService: FuncionarioService) { 
  }
  
  ngOnInit(): void {
    this.data = Date.now();
        
    setTimeout(() => {
      this.funcionarioService.getAllByCombo().subscribe((alunos: ComboFuncionario[]) => {
        this.dados = alunos;
        this.preencherCombo();
        
        this.dados.forEach(a => a.nome = a.nome);
        this.dados.sort((a,b) => {
          if (a.nome > b.nome) {return 1;}
          if (a.nome < b.nome) {return -1;}
          return 0;
        });
      });
    }, 0);

  }

  private preencherCombo(){
    if (this.selecionado && this.selecionado.id) {
      this.selecionado = _.find(this.dados, { id: this.selecionado.id});
    }
  } 
  
  onValorChange(registro: any) {
    this.valorChange.emit(registro);
    this.preencherCombo();
  }
}
