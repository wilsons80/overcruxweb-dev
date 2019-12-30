import { ProgramaService } from 'src/app/services/programa/programa.service';
import { Programa } from './../../../../core/programa';
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

@Component({
  selector: 'dados-atividade',
  templateUrl: './dados-atividade.component.html',
  styleUrls: ['./dados-atividade.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DadosAtividadeComponent implements OnInit {

  @Input() atividade: Atividade;

  listaPlanosAcao: PlanosAcao[];
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

  constructor(
    private planosAcaoService: PlanosAcaoService,
    private projetoService: ProjetoService,
    private programaService: ProgramaService,
    private unidadeService: UnidadeService,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.mostrarCampos = false;

    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: Unidade[]) => {
      this.unidades = unidades;
    });

    if ( this.activatedRoute.snapshot.data.modulo === Modulos.OFICINA) {
      this.mostrarCampos = true;

      this.planosAcaoService.getAll().subscribe((planosAcao: PlanosAcao[]) => {
        this.listaPlanosAcao = planosAcao;
      });

      this.projetoService.getAll().subscribe((projetos: Projeto[]) => {
        this.projetos = projetos;

      });

      this.programaService.getAllProgramasIntituicaoLogada().subscribe((programas: Programa[]) => {
        this.programas = programas;
      });
    }

  }

}
