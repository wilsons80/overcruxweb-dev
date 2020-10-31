import { Component, EventEmitter, forwardRef, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';
import { ComboAluno } from 'src/app/core/combo-aluno';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import * as _ from 'lodash';


@Component({
  selector: 'combo-beneficiario',
  templateUrl: './combo-beneficiario.component.html',
  styleUrls: ['./combo-beneficiario.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm },
                  { provide: ControlContainer, useExisting: forwardRef(() => NgModelGroup) }],  
})
export class ComboBeneficiarioComponent implements OnInit {

  @Input() showDisplayId;
  @Input() obrigatorio;
  @Input() selecionado;
  @Input() desabilitado;
  
  @Output() valorChange = new EventEmitter();
  
  dados = [];
  data: any = {};

  constructor(private alunoService: AlunoService) { 
  }

  ngOnInit(): void {
    this.data = Date.now();
    
    setTimeout(() => {
      this.alunoService.getAllAlunosByCombo().subscribe((alunos: ComboAluno[]) => {
        this.dados = alunos;
        this.preencherComboBeneficiario();
        
        this.dados.forEach(a => a.nome = a.nome);
        this.dados.sort((a,b) => {
          if (a.nome > b.nome) {return 1;}
          if (a.nome < b.nome) {return -1;}
          return 0;
        });
      });
    }, 0)

  }

  private preencherComboBeneficiario(){
    if (this.selecionado && this.selecionado.id) {
      this.selecionado = _.find(this.dados, { id: this.selecionado.id});
    }
  } 
  
  onValorChange(registro: any) {
    this.valorChange.emit(registro);
    this.preencherComboBeneficiario();
  }

}
