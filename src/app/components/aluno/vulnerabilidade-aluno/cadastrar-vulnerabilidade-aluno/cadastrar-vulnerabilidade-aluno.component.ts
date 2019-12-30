import { VulnerabilidadesAluno } from './../../../../core/vulnerabilidades-aluno';
import { Component, OnInit, Input } from '@angular/core';
import { Aluno } from 'src/app/core/aluno';
import { SituacoesVulnerabilidade } from 'src/app/core/situacoes-vulnerabilidade';
import { Solucoes } from 'src/app/core/solucoes';
import { SolucaoService } from 'src/app/services/solucao/solucao.service';
import { SituacaoVulnerabilidadeService } from 'src/app/services/situacao-vulnerabilidade/situacao-vulnerabilidade.service';

@Component({
  selector: 'cadastrar-vulnerabilidade-aluno',
  templateUrl: './cadastrar-vulnerabilidade-aluno.component.html',
  styleUrls: ['./cadastrar-vulnerabilidade-aluno.component.css']
})
export class CadastrarVulnerabilidadeAlunoComponent implements OnInit {

  @Input() vulnerabilidade: VulnerabilidadesAluno = new VulnerabilidadesAluno();
  @Input() aluno: Aluno;

  situacaoVulnerabilidades: SituacoesVulnerabilidade[];
  solucoes: Solucoes[];

  constructor(private solucaoService: SolucaoService,
              private situacaoVulnerabilidadeService: SituacaoVulnerabilidadeService) {
  }

  ngOnInit() {
    this.initObjetos();

    this.solucaoService.getAll().subscribe((solucoes: Solucoes[]) => {
      this.solucoes = solucoes;
    });

    this.situacaoVulnerabilidadeService.getAll().subscribe((situacaoVulnerabilidades: SituacoesVulnerabilidade[]) => {
      this.situacaoVulnerabilidades = situacaoVulnerabilidades.filter(s => !s.sigiloso);
    });

  }

  adicionar() {
    this.aluno.vulnerabilidades.push(this.vulnerabilidade);
    this.initObjetos();
  }

  initObjetos() {
    this.vulnerabilidade = new VulnerabilidadesAluno();
    this.vulnerabilidade.situacoesVulnerabilidade = new SituacoesVulnerabilidade();
    this.vulnerabilidade.solucoes = new Solucoes();
  }


  habilitaBotao(formulario): boolean {
    return Object.keys(formulario.controls).length &&
          (formulario.controls.dataIdentificacao.value !== undefined ||
           formulario.controls.dataSolucao.value !== undefined ||
           formulario.controls.situacoesVulnerabilidade.value !== undefined ||
           formulario.controls.solucoes.value !== undefined);
  }

  carregar(vulnerabilidade) {
    this.vulnerabilidade = vulnerabilidade;
  }

}

