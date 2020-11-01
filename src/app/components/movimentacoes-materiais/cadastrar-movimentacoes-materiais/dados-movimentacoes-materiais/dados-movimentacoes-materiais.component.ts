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
import { FilterMovimentacoes } from 'src/app/core/filter-movimentacoes';
import { ComboPrograma } from 'src/app/core/combo-programa';
import { ComboProjeto } from 'src/app/core/combo-projeto';

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
  departamentos:Departamento[];
  unidades: Unidade[];

  filtro: FilterMovimentacoes;
  
  constructor(
    private empresaService:EmpresaService,
    private programaService:ProgramaService,
    private projetoService:ProjetoService,
    private departamentoService:DepartamentoService,
    private unidadeService:UnidadeService,
  ) { 
    this.filtro = new FilterMovimentacoes();
    this.filtro.programa = new ComboPrograma();
    this.filtro.projeto  = new ComboProjeto();
  }

  ngOnInit() {

    this.filtro.programa.id = this.movimentacoes.programa.id;
    this.filtro.projeto.id  = this.movimentacoes.projeto.id;

    this.empresaService.getAllCombo().subscribe((empresas:Empresa[]) => {
      this.empresas = empresas;
    })

    this.departamentoService.getAllCombo().subscribe((departamentos:Departamento[]) => {
      this.departamentos = departamentos;
    })

    this.unidadeService.getAllUnidadeParaCombo().subscribe((unidades:Unidade[]) => {
      this.unidades = unidades;
    })

  }


  onValorChangePrograma(registro: any) {
    this.filtro.programa = registro;
    if(registro){
      this.movimentacoes.programa.id = this.filtro.programa.id;
    }else{
      this.movimentacoes.programa = null;
    }
  }

  onValorChangeProjeto(registro: any) {
    this.filtro.projeto = registro;
    if(registro){
      this.movimentacoes.projeto.id = this.filtro.projeto.id;
    }else{
      this.movimentacoes.projeto = null;
    }
  }
}
