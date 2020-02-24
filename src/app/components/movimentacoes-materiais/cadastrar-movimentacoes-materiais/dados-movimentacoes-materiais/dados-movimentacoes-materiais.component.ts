import { MovimentacoesMateriais } from './../../../../core/movimentacoes-materiais';
import { Component, OnInit, Input } from '@angular/core';
import { TipoMovimentacao } from 'src/app/core/tipo-movimentacao';
import { Empresa } from 'src/app/core/empresa';
import { Projeto } from 'src/app/core/projeto';
import { Programa } from 'src/app/core/programa';
import { Departamento } from 'src/app/core/departamento';
import { Unidade } from 'src/app/core/unidade';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { DepartamentoService } from 'src/app/services/departamento/departamento.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'dados-movimentacoes-materiais',
  templateUrl: './dados-movimentacoes-materiais.component.html',
  styleUrls: ['./dados-movimentacoes-materiais.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DadosMovimentacoesMateriaisComponent implements OnInit {

  @Input() movimentacoes: MovimentacoesMateriais;

  tiposMovimentacao: TipoMovimentacao = new TipoMovimentacao();

  empresas:Empresa[];
  projetos:Projeto[];
  programas:Programa[];
  departamentos:Departamento[];
  unidades: Unidade[];

  constructor(
    private empresaService:EmpresaService,
    private programaService:ProgramaService,
    private projetoService:ProjetoService,
    private departamentoService:DepartamentoService,
    private unidadeService:UnidadeService,
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

    this.unidadeService.getAllUnidadeParaCombo().subscribe((unidades:Unidade[]) => {
      this.unidades = unidades;
    })

  }
}
