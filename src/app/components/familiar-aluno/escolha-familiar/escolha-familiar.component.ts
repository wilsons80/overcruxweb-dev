import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Aluno } from 'src/app/core/aluno';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ArquivoPessoaFisicaService } from 'src/app/services/arquivo-pessoa-fisica/arquivo-pessoa-fisica.service';
import { FileUtils } from 'src/app/utils/file-utils';
import { FamiliarAlunoService } from 'src/app/services/familiar-aluno/familiar-aluno.service';
import { GrausInstrucao } from 'src/app/core/graus-instrucao';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { startWith, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { ComboAluno } from 'src/app/core/combo-aluno';

@Component({
  selector: 'app-escolha-familiar',
  templateUrl: './escolha-familiar.component.html',
  styleUrls: ['./escolha-familiar.component.css']
})
export class EscolhaFamiliarComponent implements OnInit {

  pessoaFisica: PessoaFisica = new PessoaFisica();

  // ==============================================================
  // Variáveis referente aos dados do aluno
  autoComplete = new FormControl();


  alunos$: Observable<any[]>;
  aluno: ComboAluno = new ComboAluno();
  comboAluno: ComboAluno[] = [];

  alunoSelecionado: Aluno;

  mostrarTabelaAluno = false;
  msg: string;
  displayedColumnsAluno: string[] = ['matricula', 'nome', 'identidade', 'orgao', 'uf', 'acao'];
  dataSourceAluno: MatTableDataSource<Aluno> = new MatTableDataSource();

  // ==============================================================


  constructor(private alunoService: AlunoService,
              private router: Router,
              private toastService: ToastService,
              private route: ActivatedRoute,
              private location: Location,
              private arquivoPessoaFisicaService: ArquivoPessoaFisicaService,
              private fileUtils: FileUtils,
              private familiarAlunoService: FamiliarAlunoService
    ) {
    this.pessoaFisica.grausInstrucao = new GrausInstrucao();
  }

  ngOnInit() {
    this.carregarComboAluno();
  }

  carregarComboAluno() {
    this.alunoService.getAllAlunosByCombo().subscribe((alunos: ComboAluno[]) => {
      this.comboAluno = alunos;
      this.preencherNomeAluno();

      this.comboAluno.forEach(a => a.nome = a.nome);
      this.comboAluno.sort((a,b) => {
        if (a.nome > b.nome) {return 1;}
        if (a.nome < b.nome) {return -1;}
        return 0;
      });      
    });
  }

  preencherNomeAluno(){
    if (this.alunoService.filtro.aluno.id) {
      this.aluno = _.find(this.comboAluno, { id: this.aluno.id });
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                Métodos para buscar o aluno
  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  consultarAlunosPorNome() {
    const nomeAluno = this.aluno.nome;

    if (nomeAluno === '' || nomeAluno === undefined) {
      this.toastService.showAlerta('Informe pelo menos um nome para busca.');
    } else {
      this.alunoService.getAlunosByNome(nomeAluno).subscribe((alunos: Aluno[]) => {
        this.dataSourceAluno.data = alunos ? alunos : [];
        this.verificaMostrarTabela(alunos);
      });
    }
    
  }


  verificaMostrarTabela(alunos: Aluno[]) {
    if (!alunos || alunos.length === 0) {
      this.mostrarTabelaAluno = false;
      this.msg = 'Nenhum aluno cadastrado.';
    } else {
      this.mostrarTabelaAluno = true;
    }
  }

  limparSelecao() {
    this.aluno = new ComboAluno();
    this.alunoSelecionado = null;
  }

  onValorChange(event: any) {
    this.aluno = event;

    this.alunoService.getById(this.aluno.id).subscribe((alunoSelecionado: Aluno) => {
      this.alunoSelecionado = alunoSelecionado;
    })
  }

  goCadastrar() {
    this.router.navigate(['/familiaraluno/cadastrar'], { queryParams: { idAluno: this.aluno.id } });
  }

  cancelar() {
    this.location.back();
  }
}