import { GrausInstrucaoService } from './../../../../services/graus-instrucao/graus-instrucao.service';
import { Component, OnInit, Input } from '@angular/core';
import { GrausInstrucao } from 'src/app/core/graus-instrucao';
import { ControlContainer, NgForm } from '@angular/forms';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { Aluno } from 'src/app/core/aluno';

@Component({
  selector: 'escolaridade',
  templateUrl: './escolaridade.component.html',
  styleUrls: ['./escolaridade.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class EscolaridadeComponent implements OnInit {

  @Input() aluno: Aluno;
  @Input() pessoaFisica: PessoaFisica;
  
  grausInstrucao: GrausInstrucao[];

  formaIngresso: any[] = [
    { tipo: 'CRAS' },
    { tipo: 'DEMANDA ESPONTÂNEA' },
    { tipo: 'SOLICITAÇÃO JUDICIAL' },
    { tipo: 'OUTRO' },
  ];

  tipoEscola: any[] = [
    { id: 'P', tipo: 'PÚBLICO' },
    { id: 'R', tipo: 'PRIVADO' },
  ];

  nivelEscolaridade: any[] = [
    { id: 'C', tipo: 'COMPLETO' },
    { id: 'I', tipo: 'CURSANDO' },
  ]

  sim_nao: any[] = [
    {tipo: 'Sim', flag: 'S'},
    {tipo: 'Não', flag: 'N'}
  ];

  constructor(private grausInstrucaoService: GrausInstrucaoService) {
  }

  ngOnInit() {
    this.pessoaFisica.grausInstrucao = new GrausInstrucao();

    this.grausInstrucaoService.getAll()
      .subscribe((graus: GrausInstrucao[]) => this.grausInstrucao = graus);
  }

}
