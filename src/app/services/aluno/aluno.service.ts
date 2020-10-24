import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aluno } from 'src/app/core/aluno';
import { BaseService } from '../base/base.service';
import { Rotas } from 'src/app/core/rotas';
import { FilterAlunos } from 'src/app/core/filter-alunos';

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
            idPessoaFisicaMae: string|number,
            cpfPessoaFisicaAluno: string|number ) {

    idAluno              = idAluno || '';
    idPessoaFisicaMae    = idPessoaFisicaMae || '';
    cpfPessoaFisicaAluno = cpfPessoaFisicaAluno || '';


    return this.http.get(Rotas.ALUNO + 'filter', { params: {
        idAluno: `${idAluno}` ,
        idPessoaFisicaMae: `${idPessoaFisicaMae}` ,
        cpfPessoaFisicaAluno: `${cpfPessoaFisicaAluno}`
        }
    });
  }

  initFiltro() {
    if(!this.filtro.aluno) {
      this.filtro.aluno  = new Aluno();
    }

    if(!this.filtro.maeAluno) {
      this.filtro.maeAluno = new Aluno();
    }

    if(!this.filtro.cpfAluno) {
      this.filtro.cpfAluno  = new Aluno();
    }
  }

}
