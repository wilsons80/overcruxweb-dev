import { NiveisTurmas } from './../../../core/niveis-turmas';
import { Programa } from './../../../core/programa';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Turmas } from 'src/app/core/turmas';
import { Projeto } from 'src/app/core/projeto';
import { Unidade } from 'src/app/core/unidade';
import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TurmasService } from 'src/app/services/turmas/turmas.service';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { Atividade } from 'src/app/core/atividade';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'cadastrar-turmas',
  templateUrl: './cadastrar-turmas.component.html',
  styleUrls: ['./cadastrar-turmas.component.css']
})
export class CadastrarTurmasComponent implements OnInit {
  conflitos = [];

  turma: Turmas = new Turmas();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  constructor(
    private turmaService: TurmasService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
    protected drc: ChangeDetectorRef,
    private dataUtilService: DataUtilService
  ) {
  }


  ngAfterContentChecked(): void {
    this.drc.detectChanges();
  }
  
  ngOnInit() {
    this.initObjetos();
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.turmaService.getById(id).subscribe((turma: Turmas) => {
        this.turma = turma;

        if(!this.turma.programa) {
          this.turma.programa = new Programa();
        }
        if(!this.turma.projeto) {
          this.turma.projeto = new Projeto();
        }
        if(!this.turma.niveisTurma) {
          this.turma.niveisTurma = new NiveisTurmas();
        }
        if(!this.turma.unidade) {
          this.turma.unidade = new Unidade();
        }
      });
    }

  }

  initObjetos() {
    this.turma = new Turmas();
    this.turma.programa = new Programa();
    this.turma.projeto = new Projeto();
    this.turma.unidade = new Unidade();
    this.turma.niveisTurma = new NiveisTurmas();
    this.turma.colaboradores = [];
    this.turma.oficinas = [];
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    if (!this.validarDatasDeTurmaAndOficinas() ) { return; }
    if (!this.validarDatasDeTurmaAndProgramaOuProjeto()) { return; }

    this.turmaService.cadastrar(this.turma).subscribe(() => {
      this.router.navigate(['turmas']);
      this.toastService.showSucesso('Turma cadastrada com sucesso');
    });
  }

  limpar() {
    this.initObjetos();
  }

  cancelar() {
    this.router.navigate(['turmas']);
  }


  atualizar() {
    if (!this.validarDatasDeTurmaAndOficinas() ) { return; }
    if (!this.validarDatasDeTurmaAndProgramaOuProjeto()) { return; }

    this.turmaService.alterar(this.turma).subscribe(() => {
      this.router.navigate(['turmas']);
      this.toastService.showSucesso('Turma atualizada com sucesso');
    });
  }

  validarDatasDeTurmaAndProgramaOuProjeto() {
    let dataValida = true;

    const dataInicioTurma = this.dataUtilService.getDataTruncata(this.turma.dataInicioTurma);
    const dataFimTurma    = this.dataUtilService.getDataTruncata(this.turma.dataFimTurma);

    if(this.turma.projeto && this.turma.projeto.id) {
      const dataInicio = this.dataUtilService.getDataTruncata(this.turma.projeto.dataInicio);
      const dataFim    = this.dataUtilService.getDataTruncata(this.turma.projeto.dataFim);

      const isVigente = this.dataUtilService.isEntreDatasTruncada(dataInicioTurma, dataFimTurma, dataInicio, dataFim );
      if(!isVigente) {
        this.toastService.showAlerta('O período da turma: '
                                     + ' (' + dataInicioTurma.toLocaleDateString() 
                                     + ' - ' + (dataFimTurma ? dataFimTurma.toLocaleDateString() : 'em aberto') +
                                     ') não está entre o período do projeto ('+ dataInicio.toLocaleDateString() + ' - ' + (dataFim ? dataFim.toLocaleDateString() : 'em aberto' )+')' );
        dataValida = false;
      }

    } else {
      const dataInicio = this.dataUtilService.getDataTruncata(this.turma.programa.dataInicio);
      const dataFim    = this.dataUtilService.getDataTruncata(this.turma.programa.dataFim);

      const isVigente = this.dataUtilService.isEntreDatasTruncada(dataInicio, dataFim, dataInicioTurma, dataFimTurma );
      if(!isVigente) {
        this.toastService.showAlerta('O período da turma: '
                                     + ' (' + dataInicioTurma.toLocaleDateString() 
                                     + ' - ' + (dataFimTurma ? dataFimTurma.toLocaleDateString() : 'em aberto') +
                                     ') não está entre o período do programa ('+ dataInicio.toLocaleDateString() + ' - ' + (dataFim ? dataFim.toLocaleDateString() : 'em aberto' )+')' );
        dataValida = false;
      }
    }

    return dataValida;
  }

  validarDatasDeTurmaAndOficinas(): boolean {
    let dataValida = true;

    const dataInicioTurma = this.dataUtilService.getDataTruncata(this.turma.dataInicioTurma);
    const dataFimTurma    = this.dataUtilService.getDataTruncata(this.turma.dataFimTurma);

    if (this.turma.oficinas) {
      this.turma.oficinas.forEach(oficina => {
        const dataInicio = this.dataUtilService.getDataTruncata(oficina.dataInicio);
        const dataFim    = this.dataUtilService.getDataTruncata(oficina.dataFim);

        const isVigente = this.dataUtilService.isEntreDatasTruncada(dataInicioTurma, dataFimTurma, dataInicio, dataFim );
        if(!isVigente) {
          this.toastService.showAlerta('Conflito entre as datas da oficina: ' + oficina.descricao.toUpperCase() + ' (' + dataInicio.toLocaleDateString() + ' - ' + (dataFim ? dataFim.toLocaleDateString() : 'em aberto') +
                                       ') com as datas da turma ('+ dataInicioTurma.toLocaleDateString() + ' - ' + (dataFimTurma ? dataFimTurma.toLocaleDateString() : 'em aberto' )+')' );
          dataValida = false;
        }
      });
    }
    return dataValida;
  }
  
  validarDatasProjeto(): boolean {
    let dataValida = true;

    const dataInicioTurma = this.dataUtilService.getDataTruncata(this.turma.dataInicioTurma);
    const dataFimTurma    = this.dataUtilService.getDataTruncata(this.turma.dataFimTurma);

    const dataInicio = this.dataUtilService.getDataTruncata(this.turma.projeto.dataInicio);
    const dataFim    = this.dataUtilService.getDataTruncata(this.turma.projeto.dataFim);

    const isVigente = this.dataUtilService.isEntreDatasTruncada(dataInicioTurma, dataFimTurma, dataInicio, dataFim);

    if(!isVigente) {
      this.toastService.showAlerta('Conflito entre as datas do projeto: ' + this.turma.projeto.descricao.toUpperCase() + '(' + dataInicio.toLocaleDateString() + ' - ' + (dataFim ? dataFim.toLocaleDateString() : 'em aberto') +
                                   ') com as datas da turma ('+ dataInicioTurma.toLocaleDateString() + ' - ' + (dataFimTurma ? dataFimTurma.toLocaleDateString() : 'em aberto' )+')' );
      dataValida = false;
    }

    return dataValida;
  }

  validarDatasPrograma(): boolean {
    let dataValida = true;

    const dataInicioTurma = this.dataUtilService.getDataTruncata(this.turma.dataInicioTurma);
    const dataFimTurma    = this.dataUtilService.getDataTruncata(this.turma.dataFimTurma);

    const dataInicio = this.dataUtilService.getDataTruncata(this.turma.programa.dataInicio);
    const dataFim    = this.dataUtilService.getDataTruncata(this.turma.programa.dataFim);

    const isVigente = this.dataUtilService.isEntreDatasTruncada(dataInicioTurma, dataFimTurma, dataInicio, dataFim);

    if(!isVigente) {
      this.toastService.showAlerta('Conflito entre as datas do programa: ' + this.turma.programa.descricao.toUpperCase() + '(' + dataInicio.toLocaleDateString() + ' - ' + (dataFim ? dataFim.toLocaleDateString() : 'em aberto') +
                                   ') com as datas da turma ('+ dataInicioTurma.toLocaleDateString() + ' - ' + (dataFimTurma ? dataFimTurma.toLocaleDateString() : 'em aberto' )+')' );
      dataValida = false;
    }

    return dataValida;
  }

}
