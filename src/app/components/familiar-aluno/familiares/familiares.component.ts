import { Familiares } from 'src/app/core/familiares';
import { Aluno } from './../../../core/aluno';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FamiliarAlunoService } from 'src/app/services/familiar-aluno/familiar-aluno.service';
import { Router } from '@angular/router';
import { SituacaoParentesco } from 'src/app/core/situacao-parentesco';
import { BroadcastEventService } from 'src/app/services/broadcast-event/broadcast-event.service';

@Component({
  selector: 'familiares',
  templateUrl: './familiares.component.html',
  styleUrls: ['./familiares.component.css']
})
export class FamiliaresComponent implements OnInit {

  @Input() aluno: Aluno;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['nome', 'situacao', 'tutela', 'transportaaluno', 'respfinanceiro', 'datacadastro', 'acoes'];
  dataSource: MatTableDataSource<Familiares> = new MatTableDataSource();

  situacaoParentesco: SituacaoParentesco = new SituacaoParentesco();

  constructor( private familiarService: FamiliarAlunoService,
               private router: Router) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.consultar();
  }

  consultar() {
    if (this.aluno.id) {
      this.familiarService.getFamiliaresPorAluno(this.aluno.id).subscribe((familiares: any) => {
        if (!familiares || familiares.length === 0) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum familiar cadastrado para o aluno selecionado.';
        } else {
          this.dataSource.data = familiares ? familiares : [];
          this.mostrarTabela = true;
        }
      });
    }
  }

  vincular(familiar: Familiares) {
    this.router.navigate(['/familiaraluno/cadastrar'], { queryParams: { id: familiar.id } });
  }

}