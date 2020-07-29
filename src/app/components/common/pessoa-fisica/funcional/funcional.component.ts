import { Departamento } from './../../../../core/departamento';
import { DepartamentoService } from './../../../../services/departamento/departamento.service';
import { Empresa } from './../../../../core/empresa';
import { CargosService } from './../../../../services/cargos/cargos.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { ConclusaoParecer } from './../../../../core/conclusao-parecer';
import { TipoFuncionario } from './../../../../core/tipo-funcionario';
import { Funcionario } from 'src/app/core/funcionario';
import { Component, OnInit, Input } from '@angular/core';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { ParecerEntrevistador } from 'src/app/core/parecer-entrevistador';
import { ControlContainer, NgForm } from '@angular/forms';
import { Unidade } from 'src/app/core/unidade';
import { Cargo } from 'src/app/core/cargo';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';

@Component({
  selector: 'funcional',
  templateUrl: './funcional.component.html',
  styleUrls: ['./funcional.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FuncionalComponent implements OnInit {

  @Input() funcionario: Funcionario;

  tiposFuncionario: TipoFuncionario = new TipoFuncionario();

  listaParecer = [
    {id: ParecerEntrevistador.TOTALMENTO_ADEQUADO_PERFIL, descricao:'TOTALMENTE ADEQUADO AO PERFIL'},
    {id: ParecerEntrevistador.ADEQUADO_PERFIL, descricao:'ADEQUADO AO PERFIL'},
    {id: ParecerEntrevistador.NAO_ADEQUADO_PERFIL, descricao:' NÃO ADEQUADO AO PERFIL'},
    {id: ParecerEntrevistador.INDICADO_CONSULTA_FUTURA, descricao:'INDICADO PARA CONSULTA FUTURA'}
  ]

  conclusaoDoParecer = [
    {id: ConclusaoParecer.CONTINUAR, descricao: 'DAR CONTINUIDADE AO PROCESSO SELETIVO'},
    {id: ConclusaoParecer.NAO_CONTINUAR, descricao: 'NÃO DAR CONTINUIDADE AO PROCESSO SELETIVO'},
  ]

  sim_nao: any[] = [
    {tipo: 'Sim', flag: 'S'},
    {tipo: 'Não', flag: 'N'}
  ];

  funcionarios: Funcionario[];
  unidades: Unidade[];
  cargos: Cargo[];
  empresas: Empresa[];
  departamentos: Departamento[];

  constructor(
    private funcionarioService: FuncionarioService,
    private unidadeService: UnidadeService,
    private cargosService: CargosService,
    private empresaService: EmpresaService,
    private departamentoService: DepartamentoService
    ) { }

  ngOnInit() {
    this.funcionario.empresaFuncionario = new Empresa();
    this.funcionario.cargo = new Cargo();
    this.funcionario.unidade = new Unidade();
    this.funcionario.funcionarioEntrevistador = new Funcionario();
    this.funcionario.departamento = new Departamento();


    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[])=> {
      this.funcionarios = funcionarios;
    });

    this.unidadeService.getAllByInstituicaoDaUnidadeLogada().subscribe((unidades: Unidade[])=> {
      this.unidades = unidades;
    });

    this.cargosService.getAll().subscribe((cargos: Cargo[])=> {
      // Ordenação de array
      this.cargos = cargos ? cargos.sort((a,b) => {
            if (a.nome > b.nome) {return 1;}
            if (a.nome < b.nome) {return -1;}
            return 0;
        }) : [];
    });

    this.empresaService.getAll().subscribe((empresas: Empresa[])=> {
      this.empresas = empresas;
    });

    this.departamentoService.getAll().subscribe((departamentos: Departamento[]) => {
      this.departamentos = departamentos;
    });
  }

  mostrarCamposEntrevista(){
    const tipoFuncionario = this.tiposFuncionario.getTipo('D');
    return this.funcionario.tipoFuncionario === tipoFuncionario.tipo;
  }

  zerarCamposEntrevista(){
    if(!this.mostrarCamposEntrevista()){
      this.funcionario.funcionarioEntrevistador = new Funcionario();
      this.funcionario.dtHrEntrevista = null;
      this.funcionario.horaEntrevista = null;
      this.funcionario.salarioPretendido = null;
      this.funcionario.parecerEntrevistador = null;
      this.funcionario.conclusaoParecer = null;
      this.funcionario.descricaoParecerEntrevistador = null;


    }
  }

}
