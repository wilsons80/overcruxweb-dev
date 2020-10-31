import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AtividadeAluno } from 'src/app/core/atividade-aluno';
import { Acesso } from 'src/app/core/acesso';
import { AtividadeAlunoService } from 'src/app/services/atividade-aluno/atividade-aluno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Aluno } from 'src/app/core/aluno';
import { Atividade } from 'src/app/core/atividade';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import * as _ from 'lodash';
import { FilterAlunos } from 'src/app/core/filter-alunos';
import { ComboAluno } from 'src/app/core/combo-aluno';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';



@Component({
  selector: 'app-atividade-aluno',
  templateUrl: './atividade-aluno.component.html',
  styleUrls: ['./atividade-aluno.component.css']
})
export class AtividadeAlunoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  filtro: FilterAlunos = new FilterAlunos();

  atividadesAlunos: AtividadeAluno[];
  atividadeAluno: AtividadeAluno = new AtividadeAluno();


  atividades: Atividade[];
  atividade: Atividade;

  msg: string;
  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  mostrarTabela = false;

  displayedColumns: string[] = ['aluno', 'atividade', 'dataCadastroAtividade','dataInicioAtividade', 'acoes'];
  dataSource: MatTableDataSource<AtividadeAluno> = new MatTableDataSource();

  constructor(
    private atividadeAlunoService: AtividadeAlunoService,
    private atividadeService: AtividadeService,
    private alunoService: AlunoService,
    private toastService: ToastService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { 
    this.carregarPerfil = new CarregarPerfil();
  }

  ngOnInit() {
    this.limpar();

    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);
    this.dataSource.paginator = this.paginator;

    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    });
  }


  limpar() {
    this.mostrarTabela = false;
    this.atividade = new Atividade();
    this.dataSource.data = [];
    this.filtro = new FilterAlunos();
    this.filtro.aluno = new ComboAluno();
  }

  consultar() {
    if(!this.atividade.id && !this.filtro.aluno.id) {
      this.toastService.showAlerta('Informa pelo menos um parâmetro de pesquisa.');
      return;
    }

    if (this.atividade.id || this.filtro.aluno.id) {
      this.atividadeAlunoService.getFilter(this.atividade.id, this.filtro.aluno.id)
      .subscribe((atividadeAluno: AtividadeAluno[]) => {
        if (_.isEmpty(atividadeAluno)) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = atividadeAluno;
          this.mostrarTabela = true;
        }
      });
    }
  }

  atualizar(atividadeAluno: AtividadeAluno) {
    this.router.navigate(['/atividadealuno/cadastrar'], { queryParams: { idAtividadeAluno: atividadeAluno.id } });
  }

  deletar(atividadeAluno: AtividadeAluno) {
    this.chamaCaixaDialogo(atividadeAluno);
  }

  chamaCaixaDialogo(atividadeAluno: AtividadeAluno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a atividadeAluno?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.atividadeAlunoService.excluir(atividadeAluno.id).subscribe(() => {
          this.atividadeAluno.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  onValorChange(event: any) {
    this.filtro.aluno = event;
  }
}
