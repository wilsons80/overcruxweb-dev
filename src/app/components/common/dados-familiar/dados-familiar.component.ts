import { Familiares } from './../../../core/familiares';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ArquivoPessoaFisicaService } from 'src/app/services/arquivo-pessoa-fisica/arquivo-pessoa-fisica.service';
import { FileUtils } from 'src/app/utils/file-utils';
import { SituacaoParentesco } from 'src/app/core/situacao-parentesco';
import { ResponsaveisAluno } from 'src/app/core/responsaveis-aluno';
import * as _ from 'lodash';


@Component({
  selector: 'dados-familiar',
  templateUrl: './dados-familiar.component.html',
  styleUrls: ['./dados-familiar.component.css']
})
export class DadosFamiliarComponent implements OnInit {

  @Input() familiar: Familiares;
  responsavel: ResponsaveisAluno;

  situacaoParentesco: SituacaoParentesco = new SituacaoParentesco();
  situacao = '';
  tutela = '';
  respFinc = '';
  transpAluno = '';

  constructor(private arquivoPessoaFisicaService: ArquivoPessoaFisicaService,
              private fileUtils: FileUtils) { }

  ngOnInit() {
  }

  carregarDadosResponsavel() {
    this.situacaoParentesco = new SituacaoParentesco();
    this.situacao = this.situacaoParentesco.getSituacaoParentesco(this.familiar.situacaoParentesco);

    const hoje = new Date().getTime();

    this.responsavel = _.find(this.familiar.responsaveis, (r) =>
                        r.dataDesvinculacao === undefined
                        ||
                        (hoje >= new Date(r.dataVinculacao).getTime()
                         &&
                         hoje <= new Date(r.dataDesvinculacao).getTime()
                        ) );

    if (!this.responsavel) {
      this.responsavel = new ResponsaveisAluno();
    }

    this.tutela = this.responsavel.tutelaAluno ? 'Sim' : 'Não';
    this.respFinc = this.responsavel.responsavelFinanceiroPeloAluno ? 'Sim' : 'Não';
    this.transpAluno = this.responsavel.transportaAluno ? 'Sim' : 'Não';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['familiar']) {
      this.carregarDadosFamiliar();
      this.carregarDadosResponsavel();
    }
  }

  getBackground() {
    if (this.familiar.pessoasFisica && this.familiar.pessoasFisica.urlFoto) {
      return `url(${this.familiar.pessoasFisica.urlFoto})`;
    }
  }

  carregarDadosFamiliar() {
    if (this.familiar && this.familiar.pessoasFisica && this.familiar.pessoasFisica.id) {
      this.arquivoPessoaFisicaService.get(this.familiar.pessoasFisica.id).subscribe((foto: any) => {
        this.familiar.pessoasFisica.foto = foto;
        foto = this.fileUtils.convertBufferArrayToBase64(foto);
        this.familiar.pessoasFisica.urlFoto = foto ? foto.changingThisBreaksApplicationSecurity : '';
      });
    }
  }


}
