import { FuncionarioService } from './../../../../services/funcionario/funcionario.service';
import { UnidadeService } from './../../../../services/unidade/unidade.service';
import { PedidosMateriais } from 'src/app/core/pedidos-materiais';
import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { DepartamentoService } from 'src/app/services/departamento/departamento.service';
import { Programa } from 'src/app/core/programa';
import { Projeto } from 'src/app/core/projeto';
import { Departamento } from 'src/app/core/departamento';
import { Unidade } from 'src/app/core/unidade';
import { Funcionario } from 'src/app/core/funcionario';

@Component({
  selector: 'dados-pedidos-materiais',
  templateUrl: './dados-pedidos-materiais.component.html',
  styleUrls: ['./dados-pedidos-materiais.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DadosPedidosMateriaisComponent implements OnInit {

  @Input() pedidosMateriais:PedidosMateriais
  programas: Programa[];
  projetos: Projeto[];
  departamentos: Departamento[];
  unidades: Unidade[];
  funcionarios: Funcionario[];

  constructor(
    private programaService:ProgramaService,
    private projetoService:ProjetoService,
    private departamentoService:DepartamentoService,
    private unidadeService:UnidadeService,
    private funcionarioService:FuncionarioService
  ) { }

  ngOnInit() {

    this.programaService.getAllCombo().subscribe((programas:Programa[]) => {
      this.programas = programas;
    })

    this.projetoService.getAllCombo().subscribe((projetos:Projeto[]) => {
      this.projetos = projetos;
    })

    this.departamentoService.getAllCombo().subscribe((departamentos:Departamento[]) => {
      this.departamentos = departamentos;
    })

    this.unidadeService.getAllUnidadeParaCombo().subscribe((unidades:Unidade[]) => {
      this.unidades = unidades;
    })
    
    this.funcionarioService.getAllCombo().subscribe((funcionarios:Funcionario[]) => {
      this.funcionarios = funcionarios;
    })

  }

}
