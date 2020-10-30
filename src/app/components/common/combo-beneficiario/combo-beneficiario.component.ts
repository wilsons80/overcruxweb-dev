import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';
import { ComboAluno } from 'src/app/core/combo-aluno';
import { AlunoService } from 'src/app/services/aluno/aluno.service';

@Component({
  selector: 'combo-beneficiario',
  templateUrl: './combo-beneficiario.component.html',
  styleUrls: ['./combo-beneficiario.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm },
                  { provide: ControlContainer, useExisting: forwardRef(() => NgModelGroup) }],  
})
export class ComboBeneficiarioComponent implements OnInit {

  @Input() dados;
  @Input() showDisplayId;
  @Input() obrigatorio;
  @Input() selecionado;

  @Output() valorChange = new EventEmitter();

  data: any = {};

  constructor(private alunoService: AlunoService) { 
  }
  
  ngOnInit(): void {
    this.data = Date.now();

    this.alunoService.getAllAlunosByCombo().subscribe((alunos: ComboAluno[]) => {
      this.dados = alunos;
      this.dados.forEach(a => a.nome = a.nome);
      this.dados.sort((a,b) => {
        if (a.nome > b.nome) {return 1;}
        if (a.nome < b.nome) {return -1;}
        return 0;
      });
    });
  }


  
  onValorChange(event: any) {
    this.valorChange.emit(event);
  }

}
