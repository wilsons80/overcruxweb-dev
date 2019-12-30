import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Funcionario } from 'src/app/core/funcionario';
import { Objetivo } from 'src/app/core/objetivo';
import { Programa } from 'src/app/core/programa';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { ObjetivoService } from 'src/app/services/objetivo/objetivo.service';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'dados-programa',
  templateUrl: './dados-programa.component.html',
  styleUrls: ['./dados-programa.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DadosProgramaComponent implements OnInit {

  @Input() programa: Programa = new Programa();

  objetivos: Objetivo[];
  funcionarios: Funcionario[];

  funcionario: Funcionario = new Funcionario();

  constructor(
    private objetivoService: ObjetivoService,
    private funcionarioService: FuncionarioService,
  ) {
  }

  ngOnInit() {

    this.inicializarObjetos();

    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    })

    this.objetivoService.getAll().subscribe((objetivos: Objetivo[]) => {
      this.objetivos = objetivos;
    })


  }
  inicializarObjetos() {
    this.programa.objetivo = new Objetivo();
  }


  mostrarDadosFuncionario(idFuncionario: number) {
    this.funcionario = _.cloneDeep(_.find(this.funcionarios, (f: Funcionario) => f.id === idFuncionario));
  }

}
