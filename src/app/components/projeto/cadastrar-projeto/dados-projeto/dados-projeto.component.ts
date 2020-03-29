import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Projeto } from 'src/app/core/projeto';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { Funcionario } from 'src/app/core/funcionario';
import * as _ from 'lodash';
import { Programa } from 'src/app/core/programa';
import { ProgramaService } from 'src/app/services/programa/programa.service';


@Component({
  selector: 'dados-projeto',
  templateUrl: './dados-projeto.component.html',
  styleUrls: ['./dados-projeto.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DadosProjetoComponent implements OnInit {

  @Input() projeto: Projeto;

  funcionarios: Funcionario[];
  programas: Programa[];



  constructor(private funcionarioService: FuncionarioService,
              private programaService: ProgramaService) {
             
  }

  ngOnInit() {
    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    });

    this.programaService.getAllProgramasIntituicaoLogada().subscribe((programas: Programa[]) => {
      this.programas = programas;
    });

  }

  carregarDadosPrograma() {
    if (this.projeto.programa.id) {
      this.projeto.programa = _.cloneDeep(_.find(this.programas,  (f: Programa) => f.id === this.projeto.programa.id));
    }
  }

}
