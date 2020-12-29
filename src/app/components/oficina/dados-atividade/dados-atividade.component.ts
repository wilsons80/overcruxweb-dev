import { ProgramaService } from 'src/app/services/programa/programa.service';
import { Component, OnInit, Input } from '@angular/core';
import { Atividade } from 'src/app/core/atividade';
import { Unidade } from 'src/app/core/unidade';
import { PlanosAcaoService } from 'src/app/services/planosAcao/planos-acao.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { PlanosAcao } from 'src/app/core/planos-acao';
import { Projeto } from 'src/app/core/projeto';
import { ControlContainer, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Modulos } from 'src/app/core/modulos';
import { Programa } from 'src/app/core/programa';
import * as _ from 'lodash';
import { TiposAtividadesService } from 'src/app/services/tipos-atividades/tipos-atividades.service';
import { TiposAtividades } from 'src/app/core/tipos-atividades';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';

@Component({
  selector: 'dados-atividade',
  templateUrl: './dados-atividade.component.html',
  styleUrls: ['./dados-atividade.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DadosAtividadeComponent implements OnInit {

  @Input() atividade: Atividade;

  todosProjetos: Projeto[];
  projetos: Projeto[];
  programas: Programa[];
  unidades: Unidade[];

  tipoHorario: any = [
    { id: 'F', descricao: 'FIXO' },
    { id: 'L', descricao: 'LIVRE' },
  ];

  localExecucao: any = [
    { id: 'I', descricao: 'INTERNA' },
    { id: 'E', descricao: 'EXTERNA' },
  ];

  mostrarCampos = false;
  tiposAtividades: TiposAtividades[];

  constructor(
    private toolbarPrincipalService: ToolbarPrincipalService,
    private tiposAtividadesService: TiposAtividadesService,
    private projetoService: ProjetoService,
    private programaService: ProgramaService,
    private unidadeService: UnidadeService,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.mostrarCampos = false;

    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: Unidade[]) => {
      this.unidades = unidades;
      if(!this.atividade.unidade.idUnidade){
        this.atividade.unidade = _.find(this.unidades, (u: Unidade) => u.idUnidade === this.toolbarPrincipalService.getUnidadeLogada().id);
      }

    });

    if ( this.activatedRoute.snapshot.data.modulo === Modulos.OFICINA) {
      this.mostrarCampos = true;

      this.projetoService.getAll().subscribe((projetos: Projeto[]) => {
        this.todosProjetos = projetos;
        this.projetos      = projetos;
      });
      
      this.tiposAtividadesService.getAll().subscribe((tiposAtividades: TiposAtividades[]) => {
        this.tiposAtividades = tiposAtividades;
      });

      this.programaService.getAllCombo().subscribe((programas: Programa[]) => {
        this.programas = programas;
      });
    }

  }

  carregarPrograma(idPrograma: number) {
    if(!idPrograma) {
      this.projetos = this.todosProjetos; 
      return;
    } 

    this.atividade.programa = _.cloneDeep(_.find(this.programas, (a: Programa) => a.id === idPrograma));
    this.projetoService.getAllPorPrograma(idPrograma).subscribe((projetos: Projeto[]) => {
      this.projetos = projetos;
    });
  }

  carregarProjeto(idProjeto: number) {
    if(!idProjeto) {
      this.atividade.projeto = null;
      return;
    }
    this.atividade.projeto = _.cloneDeep(_.find(this.projetos, (a: Projeto) => a.id === idProjeto));
  }

}
