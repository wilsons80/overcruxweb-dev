import { Component, EventEmitter, forwardRef, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';
import { ComboAluno } from 'src/app/core/combo-aluno';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import * as _ from 'lodash';
import { FuncoesUteisService } from 'src/app/services/commons/funcoes-uteis.service';


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

  constructor(private alunoService: AlunoService,
              private funcoesUteisService: FuncoesUteisService) { 
  }

  ngOnInit(): void {
    this.data = Date.now();
    
    setTimeout(() => {
      this.alunoService.getAllAlunosByCombo().subscribe((alunos: ComboAluno[]) => {
        this.dados = alunos;
        this.preencherComboBeneficiario();
        this.dados = this.funcoesUteisService.ordernarArray(this.dados, 'nome');
      });
    }, 0)

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["selecionado"] && this.selecionado && this.selecionado.id) {
      this.preencherComboBeneficiario();
    }
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
