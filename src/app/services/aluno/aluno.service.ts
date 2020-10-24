import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aluno } from 'src/app/core/aluno';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';
import { FilterAlunos } from 'src/app/core/filter-alunos';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';

@Injectable({
  providedIn: 'root'
})
export class AlunoService extends BaseService<Aluno> {

  filtro: FilterAlunos = new FilterAlunos();

  constructor(http: HttpClient) {
    super(http, Rotas.ALUNO);
    this.initFiltro();
  }

  getAlunosByNome(nome: string) {
    return this.http.get(`${Rotas.ALUNO}nome/${nome}`);
  }

  

  getFilter(idAluno: string|number,
            nomePessoaFisicaMae: string|number,
            cpfPessoaFisicaAluno: string|number ) {

    idAluno              = idAluno || '';
    nomePessoaFisicaMae  = nomePessoaFisicaMae || '';
    cpfPessoaFisicaAluno = cpfPessoaFisicaAluno || '';


    return this.http.get(Rotas.ALUNO + 'filter', { params: {
        idAluno: `${idAluno}` ,
        nomePessoaFisicaMae: `${nomePessoaFisicaMae}` ,
        cpfPessoaFisicaAluno: `${cpfPessoaFisicaAluno}`
        }
    });
  }

  initFiltro() {
    if(!this.filtro.aluno) {
      this.filtro.aluno  = new Aluno();
    }

    if(!this.filtro.maeAluno) {
      this.filtro.maeAluno = new PessoaFisica();
    }

    if(!this.filtro.cpfAluno) {
      this.filtro.cpfAluno = new PessoaFisica();
    }
  }

}
