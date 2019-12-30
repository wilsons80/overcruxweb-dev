import { Atividade } from 'src/app/core/atividade';
import { Cargo } from 'src/app/core/cargo';
import { CargosService } from './../../../../../services/cargos/cargos.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FuncionarioService } from './../../../../../services/funcionario/funcionario.service';
import { Funcionario } from 'src/app/core/funcionario';
import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { ColaboradoresAtividade } from 'src/app/core/colaboradores-atividade';

@Component({
  selector: 'cadastrar-colaboradores-atividade',
  templateUrl: './cadastrar-colaboradores-atividade.component.html',
  styleUrls: ['./cadastrar-colaboradores-atividade.component.css']
})
export class CadastrarColaboradoresAtividadeComponent implements OnInit {

  @Input() oficina: Atividade;

  listaDeFuncionarios: Funcionario[] = [];

  colaboradorAtividade: ColaboradoresAtividade = new ColaboradoresAtividade()
  listaDeCargos: Cargo[];

  isAtualizar: Boolean = false;
  isMostrarFuncionario: Boolean = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private cargosService: CargosService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.colaboradorAtividade.funcionario = new Funcionario();
    this.colaboradorAtividade.cargo = new Cargo();
    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => this.listaDeFuncionarios = funcionarios);
    this.cargosService.getAll().subscribe((cargos: Cargo[]) => this.listaDeCargos = cargos)
  }


  zerarCombos() {
    this.colaboradorAtividade = new ColaboradoresAtividade();
    this.colaboradorAtividade.funcionario = new Funcionario();
    this.colaboradorAtividade.cargo = new Cargo();
    this.colaboradorAtividade.dtEntradaAtividade = null;
    this.colaboradorAtividade.dtSaidaAtividade = null;
    this.isMostrarFuncionario = false;
  }

  adicionar() {
    const funcionarioJaCadastrado = _.find(this.oficina.colaboradoresAtividade, (colaboradoresAtividade: ColaboradoresAtividade) => colaboradoresAtividade.funcionario.id === this.colaboradorAtividade.funcionario.id);

    if (_.isEmpty(funcionarioJaCadastrado)) {
      const colaboradorAtividade = new ColaboradoresAtividade();
      Object.assign(colaboradorAtividade, this.colaboradorAtividade);

      if (!this.oficina.colaboradoresAtividade) {
        this.oficina.colaboradoresAtividade = [];
      }

      this.oficina.colaboradoresAtividade.push(colaboradorAtividade);
      this.zerarCombos();
    } else {
      this.toastService.showAlerta("Funcionário já está adicionado a lista de colaboradores");
    }
  }

  atualizar() {
    const index = this.oficina.colaboradoresAtividade.indexOf(this.oficina.colaboradoresAtividade.find(col => col.funcionario.id === this.colaboradorAtividade.funcionario.id));
    this.oficina.colaboradoresAtividade.splice(index, 1, this.colaboradorAtividade);
    this.isAtualizar = false;
    this.zerarCombos();
  }

  atualizarColaborador(colaborador: ColaboradoresAtividade) {
    this.isAtualizar = true;
    this.colaboradorAtividade = colaborador;
  }

  cancelar() {
    this.zerarCombos();
    this.isAtualizar = false;
  }

  mostrarDadosFuncionario(idFuncionario:number) {
    this.colaboradorAtividade.funcionario = _.cloneDeep(_.find(this.listaDeFuncionarios, (f: Funcionario) => f.id === idFuncionario));
  }

  setCargo(idCargo:number){
    this.colaboradorAtividade.cargo = _.cloneDeep(_.find(this.listaDeCargos, (c: Cargo) => c.id === idCargo));
  }

}
