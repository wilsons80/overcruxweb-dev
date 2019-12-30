import { SituacoesVulnerabilidade } from './../../../../core/situacoes-vulnerabilidade';
import { SituacaoVulnerabilidadeService } from './../../../../services/situacao-vulnerabilidade/situacao-vulnerabilidade.service';
import { Component, OnInit, Input } from '@angular/core';
import { Familiares } from 'src/app/core/familiares';
import { VulnerabilidadesFamiliar } from 'src/app/core/vulnerabilidades-familiar';
import { Solucoes } from 'src/app/core/solucoes';
import { ToastService } from 'src/app/services/toast/toast.service';
import { SolucaoService } from 'src/app/services/solucao/solucao.service';

@Component({
  selector: 'cadastrar-vulnerabilidade',
  templateUrl: './cadastrar-vulnerabilidade.component.html',
  styleUrls: ['./cadastrar-vulnerabilidade.component.css']
})
export class CadastrarVulnerabilidadeComponent implements OnInit {

  @Input() vulnerabilidade: VulnerabilidadesFamiliar = new VulnerabilidadesFamiliar();
  @Input() familiar: Familiares;

  situacaoVulnerabilidades: SituacoesVulnerabilidade[];
  solucoes: Solucoes[];

  constructor(private toastService: ToastService,
              private solucaoService: SolucaoService,
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
    Object.assign(this.vulnerabilidade.familiar, this.familiar);

    delete this.vulnerabilidade.familiar.vulnerabilidades;

    this.familiar.vulnerabilidades.push(this.vulnerabilidade);
  }

  initObjetos() {
    this.vulnerabilidade = new VulnerabilidadesFamiliar();
    this.vulnerabilidade.situacoesVulnerabilidade = new SituacoesVulnerabilidade();
    this.vulnerabilidade.solucoes = new Solucoes();

    this.vulnerabilidade.familiar = new Familiares();
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
