import { Component, OnInit, Input } from '@angular/core';
import { ColaboradoresTurma } from 'src/app/core/colaboradores-turma';
import { Funcionario } from 'src/app/core/funcionario';
import { Cargo } from 'src/app/core/cargo';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TurmasService } from 'src/app/services/turmas/turmas.service';
import * as _ from 'lodash';
import { Turmas } from 'src/app/core/turmas';
import { ControlContainer, NgForm } from '@angular/forms';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';

@Component({
  selector: 'cadastrar-colaboradores-turma',
  templateUrl: './cadastrar-colaboradores-turma.component.html',
  styleUrls: ['./cadastrar-colaboradores-turma.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class CadastrarColaboradoresTurmaComponent implements OnInit {

  @Input() colaboradoresTurma: ColaboradoresTurma[];

  listaDeFuncionarios: Funcionario[] = [];

  colaboradorTurma: ColaboradoresTurma = new ColaboradoresTurma();
  listaDeCargos: Cargo[];
  listaDeTurmas: Turmas[];

  isAtualizar = false;
  isMostrarFuncionario = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private cargosService: CargosService,
    private turmasService: TurmasService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.initObjeto();

    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => this.listaDeFuncionarios = funcionarios);
    this.cargosService.getAll().subscribe((cargos: Cargo[]) => this.listaDeCargos = cargos)
  }


  initObjeto() {
    this.colaboradorTurma = new ColaboradoresTurma();
    this.colaboradorTurma.funcionario = new Funcionario();
    this.colaboradorTurma.funcionario.pessoasFisica = new PessoaFisica();
    this.colaboradorTurma.cargo = new Cargo();
    this.colaboradorTurma.dataEntradaTurma = null;
    this.colaboradorTurma.dataSaidaTurma = null;
    this.isMostrarFuncionario = false;
  }

  adicionar() {
    const funcionarioJaCadastrado = _.find(this.colaboradoresTurma, (colaboradorTurma: ColaboradoresTurma) => colaboradorTurma.funcionario.id === this.colaboradorTurma.funcionario.id);

    if (_.isEmpty(funcionarioJaCadastrado)) {
      const colaboradorTurma = new ColaboradoresTurma();
      Object.assign(colaboradorTurma, this.colaboradorTurma);

      if (!this.colaboradoresTurma) {
        this.colaboradoresTurma = [];
      }

      this.colaboradoresTurma.push(colaboradorTurma);
      this.initObjeto();

    } else {
      this.toastService.showAlerta('Funcionário já está adicionado a lista de colaboradores');
    }
  }

  atualizar() {
    const index = this.colaboradoresTurma.indexOf(this.colaboradoresTurma.find(col => col.funcionario.id === this.colaboradorTurma.funcionario.id));
    this.colaboradoresTurma.splice(index, 1, this.colaboradorTurma);
    this.isAtualizar = false;
    this.initObjeto();
  }

  atualizarColaborador(colaboradorTurma: ColaboradoresTurma) {
    this.isAtualizar = true;
    this.colaboradorTurma = colaboradorTurma;
  }

  cancelar() {
    this.initObjeto();
    this.isAtualizar = false;
  }

  mostrarDadosFuncionario(idFuncionario: number) {
    this.colaboradorTurma.funcionario = _.cloneDeep(_.find(this.listaDeFuncionarios, (f: Funcionario) => f.id === idFuncionario));
  }

  setCargo(idCargo: number){
    this.colaboradorTurma.cargo = _.cloneDeep(_.find(this.listaDeCargos, (c: Cargo) => c.id === idCargo));
  }


}
