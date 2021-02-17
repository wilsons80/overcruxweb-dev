import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { Acoes } from 'src/app/core/acoes';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { Atividade } from 'src/app/core/atividade';
import { Funcionario } from 'src/app/core/funcionario';
import * as _ from 'lodash';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';


@Component({
  selector: 'formulario-acao-oficina',
  templateUrl: './formulario-acao-oficina.component.html',
  styleUrls: ['./formulario-acao-oficina.component.css'] ,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm },
                  { provide: ControlContainer, useExisting: forwardRef(() => NgModelGroup) }],  

})
export class FormularioAcaoOficinaComponent implements OnInit {

  atividades: Atividade[];
  funcionarios: Funcionario[];

  local_execucao: any[] = [
    {tipo: 'Interna', flag: 'I'},
    {tipo: 'Externa', flag: 'E'}
  ];

  @Input() acao: Acoes;

  constructor(private atividadeService: AtividadeService,
              private dataUtilService: DataUtilService) {

  }

  ngOnInit() {
    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    });
  }


  getNomeAtividade(){
    if(this.atividades)
    return this.atividades.length === 0 ? 'Nenhuma atividade cadastrada' : 'Atividade'
  }

  mostrarDadosAtividade(idAtividade) {
    
    if(idAtividade) {
      this.acao.oficina = _.cloneDeep(_.find(this.atividades, (a: Atividade) => a.id === idAtividade));
    } else {
      this.acao.oficina = new Atividade();
    }
  }


  onMascaraDataInput(event) {
    return this.dataUtilService.onMascaraDataInput(event);
  }


  onValorChangeFuncionario(registro: any) {
    this.acao.funcionarioAprovaAcao = registro;
  }
}
