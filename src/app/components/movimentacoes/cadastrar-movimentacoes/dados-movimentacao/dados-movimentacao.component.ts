import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { UnidadeService } from './../../../../services/unidade/unidade.service';
import { DepartamentoService } from 'src/app/services/departamento/departamento.service';
import { ProgramaService } from './../../../../services/programa/programa.service';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { Empresa } from './../../../../core/empresa';
import { Component, OnInit, Input } from '@angular/core';
import { Projeto } from 'src/app/core/projeto';
import { Programa } from 'src/app/core/programa';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { Departamento } from 'src/app/core/departamento';
import { Unidade } from 'src/app/core/unidade';
import { Movimentacoes } from 'src/app/core/movimentacoes';
import { ControlContainer, NgForm } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ContasBancariaService } from 'src/app/services/contas-bancaria/contas-bancaria.service';
import * as _ from 'lodash';


@Component({
  selector: 'dados-movimentacao',
  templateUrl: './dados-movimentacao.component.html',
  styleUrls: ['./dados-movimentacao.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DadosMovimentacaoComponent implements OnInit {

  @Input() movimentacoes:Movimentacoes;

  empresas:Empresa[];
  projetos:Projeto[];
  programas:Programa[];
  departamentos:Departamento[];
  unidades: Unidade[];
  contasBancarias: ContasBancaria[];

  tiposMovimentacao = [
    {id: 'E', descricao: 'ENTRADA'},
    {id: 'S', descricao: 'SAÍDA'}
  ]

  constructor(
    private empresaService: EmpresaService,
    private programaService: ProgramaService,
    private projetoService: ProjetoService,
    private departamentoService: DepartamentoService,
    private unidadeService: UnidadeService,
    private toastService: ToastService,
    private contasBancariaService: ContasBancariaService
  ) { }

  ngOnInit() {

    this.empresaService.getAllCombo().subscribe((empresas:Empresa[]) => {
      this.empresas = empresas;
    })

    this.programaService.getAllCombo().subscribe((programas:Programa[]) => {
      this.programas = programas;
    })

    this.projetoService.getAllCombo().subscribe((projetos:Projeto[]) => {
      this.projetos = projetos;
    })

    this.departamentoService.getAllCombo().subscribe((departamentos:Departamento[]) => {
      this.departamentos = departamentos;
    })

    this.unidadeService.getAllByInstituicaoDaUnidadeLogada().subscribe((unidades:Unidade[]) => {
      this.unidades = unidades;
    })

    this.contasBancariaService.getAllComboByInstituicaoLogada()
    .subscribe((contasBancarias: ContasBancaria[]) => {
      this.contasBancarias = contasBancarias;
    })
  }

  validarValorNegativo( valor: number ) {
    if (valor < 0) {
      this.movimentacoes.qtdParcelas = null;
      this.toastService.showAlerta('A quantidade de parcelas não pode ter valor negativo, informe outro valor.');
    }
  }

  validarValorDodumento(valor) {
    if (valor.includes("-")) {
      this.movimentacoes.valorMovimentacao = null;
      this.toastService.showAlerta('O valor do documento não pode ser negativo, informe outro valor.');
    }
  }

  carregarContaBancaria() {
    if (this.movimentacoes.contaBancaria && this.movimentacoes.contaBancaria.id) {
      this.movimentacoes.contaBancaria = _.cloneDeep(_.find(this.contasBancarias,  (c: ContasBancaria) => c.id === this.movimentacoes.contaBancaria.id));
    }
  }
 
}
