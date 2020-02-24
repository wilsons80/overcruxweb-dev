import { Component, OnInit, Input } from '@angular/core';
import { Acoes } from 'src/app/core/acoes';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { Atividade } from 'src/app/core/atividade';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { Funcionario } from 'src/app/core/funcionario';
import * as _ from 'lodash';


@Component({
  selector: 'formulario-acao-oficina',
  templateUrl: './formulario-acao-oficina.component.html',
  styleUrls: ['./formulario-acao-oficina.component.css']
})
export class FormularioAcaoOficinaComponent implements OnInit {

  atividades: Atividade[];
  funcionarios: Funcionario[];

  @Input() acao: Acoes;

  constructor(private atividadeService: AtividadeService,
              private funcionarioService: FuncionarioService) {

  }

  ngOnInit() {
    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    });

    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    });
  }


  getNomeAtividade(){
    if(this.atividades)
    return this.atividades.length === 0 ? 'Nenhuma atividade cadastrada' : 'Atividade'
  }

  mostrarDadosAtividade(idAtividade) {
    this.acao.oficina = _.cloneDeep(_.find(this.atividades, (a: Atividade) => a.id === idAtividade));
  }


  carregarDadosFuncionarioAprovacao() {
    if (this.acao.funcionarioAprovaAcao.id) {
      this.acao.funcionarioAprovaAcao = _.cloneDeep(_.find(this.funcionarios,  (f: Funcionario) => f.id === this.acao.funcionarioAprovaAcao.id));
    }
  }

  carregarDadosFuncionarioExecucao() {
    if (this.acao.funcionarioExecutaAcao.id) {
      this.acao.funcionarioExecutaAcao = _.cloneDeep(_.find(this.funcionarios,  (f: Funcionario) => f.id === this.acao.funcionarioExecutaAcao.id));
    }
  }
  carregarDadosFuncionarioPlanejamento() {
    if (this.acao.funcionarioPlanejamentoAcao.id) {
      this.acao.funcionarioPlanejamentoAcao = _.cloneDeep(_.find(this.funcionarios,  (f: Funcionario) => f.id === this.acao.funcionarioPlanejamentoAcao.id));
    }
  }

}
