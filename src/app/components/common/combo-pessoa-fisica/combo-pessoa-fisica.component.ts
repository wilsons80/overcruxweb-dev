import { ComboPessoaFisica } from './../../../core/combo-pessoa-fisica';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';
import { ComboFuncionario } from 'src/app/core/combo-funcionario';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import * as _ from 'lodash';
import { PessoaFisicaService } from 'src/app/services/pessoa-fisica/pessoa-fisica.service';


@Component({
  selector: 'combo-pessoa-fisica',
  templateUrl: './combo-pessoa-fisica.component.html',
  styleUrls: ['./combo-pessoa-fisica.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm },
                  { provide: ControlContainer, useExisting: forwardRef(() => NgModelGroup) }],   
})
export class ComboPessoaFisicaComponent implements OnInit {

  @Input() showDisplayId;
  @Input() obrigatorio;
  @Input() selecionado;
  @Input() desabilitado;
  @Input() label;
  @Input() fxFlexOffset = "20px";
  
  @Output() valorChange = new EventEmitter();
  
  dados = [];
  data: any = {};

  constructor(private pessoaFisicaService: PessoaFisicaService) { 
  }
  
  ngOnInit(): void {
    this.data = Date.now();
        
    setTimeout(() => {
      this.pessoaFisicaService.getAllPessoasByCombo().subscribe((pessoas: ComboPessoaFisica[]) => {
        this.dados = pessoas;
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
