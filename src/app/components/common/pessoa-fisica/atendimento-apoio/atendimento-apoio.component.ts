import { Component, OnInit, Input } from '@angular/core';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import {CondicoesMoradiaService} from 'src/app/services/condicoes-moradia/condicoes-moradia.service';
import {CondicoesMoradia} from 'src/app/core/condicoes-moradia';

@Component({
  selector: 'atendimento-apoio',
  templateUrl: './atendimento-apoio.component.html',
  styleUrls: ['./atendimento-apoio.component.css']
})
export class AtendimentoApoioComponent implements OnInit {

  @Input() pessoaFisica: PessoaFisica;
  @Input() atendidoOrgaoRede: string;

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

    constructor(private condicaoMoradiaService: CondicoesMoradiaService) { }

    ngOnInit() {
      this.pessoaFisica.condicoesMoradia = new CondicoesMoradia();
  
      this.condicaoMoradiaService.getAll().subscribe((condicoes: CondicoesMoradia[]) => {
          this.condicoesMoradia = condicoes;
      });
     }

}




  