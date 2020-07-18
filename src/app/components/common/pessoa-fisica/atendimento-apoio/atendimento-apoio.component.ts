import { Component, OnInit, Input } from '@angular/core';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import {CondicoesMoradiaService} from 'src/app/services/condicoes-moradia/condicoes-moradia.service';
import {CondicoesMoradia} from 'src/app/core/condicoes-moradia';
import { EncaminhamentoAluno } from 'src/app/core/encaminhamento-aluno';
import { EntidadesSociais } from 'src/app/core/entidades-sociais';
import { EntidadeSocialService } from 'src/app/services/entidade-social/entidade-social.service';
import { ControlContainer, NgForm } from '@angular/forms';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'atendimento-apoio',
  templateUrl: './atendimento-apoio.component.html',
  styleUrls: ['./atendimento-apoio.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class AtendimentoApoioComponent implements OnInit {

  @Input() pessoaFisica: PessoaFisica;
  @Input() atendidoOrgaoRede: string;
  @Input() encaminhamentos: EncaminhamentoAluno[];

  entidadesSociais: EntidadesSociais[];

  formaIngressoEntidade = [ 'CRAS',
                            'DEMANDA ESPONTÂNEA',
                            'SOLICITAÇÃO JUDICIAL',
                            'OUTRO'
                          ];

  sim_nao: any[] = [
    {tipo: 'Sim', flag: 'S'},
    {tipo: 'Não', flag: 'N'}
  ];
  condicoesMoradia: CondicoesMoradia[];
  
  tipoEscola: any[] = [
      {tipo: 'Pública', flag: 'P'},
      {tipo: 'Privada', flag: 'R'}
  ];

  
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  constructor(private condicaoMoradiaService: CondicoesMoradiaService,
              private activatedRoute: ActivatedRoute,
              private entidadeSocialService: EntidadeSocialService,) { 
    this.carregarPerfil = new CarregarPerfil();            
  }

  ngOnInit() {
      this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

      
      if (!this.perfilAcesso.insere){
        this.mostrarBotaoCadastrar = false;
      }

      if (!this.perfilAcesso.altera){
        this.mostrarBotaoAtualizar = false;
      }

      this.pessoaFisica.condicoesMoradia = new CondicoesMoradia();
  
      this.condicaoMoradiaService.getAll().subscribe((condicoes: CondicoesMoradia[]) => {
          this.condicoesMoradia = condicoes;
      });

      this.entidadeSocialService.getAll().subscribe((entidadesSociais: EntidadesSociais[]) => {
        this.entidadesSociais = entidadesSociais;
      });

  }


  addEncaminhamento() {
      if (!this.encaminhamentos) {
        this.encaminhamentos = [];
      }
      const encaminhamento:any = new EncaminhamentoAluno();
      encaminhamento.entidadeSocial = new EntidadesSociais();
  
      this.encaminhamentos.push(encaminhamento);
  }

}




  