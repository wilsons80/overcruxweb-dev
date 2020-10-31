import { Aluno } from 'src/app/core/aluno';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TipoOcorrenciaAluno } from 'src/app/core/tipo-ocorrencia-aluno';
import { OcorrenciaAluno } from 'src/app/core/ocorrencia-aluno';
import { Acesso } from 'src/app/core/acesso';
import { TipoOcorrenciaAlunoService } from 'src/app/services/tipo-ocorrencia-aluno/tipo-ocorrencia-aluno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { OcorrenciaAlunoService } from 'src/app/services/ocorrencia-aluno/ocorrencia-aluno.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { FilterAlunos } from 'src/app/core/filter-alunos';
import { ComboAluno } from 'src/app/core/combo-aluno';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import * as _ from 'lodash';


@Component({
  selector: 'ocorrencia-aluno',
  templateUrl: './ocorrencia-aluno.component.html',
  styleUrls: ['./ocorrencia-aluno.component.css']
})
export class OcorrenciaAlunoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  tiposOcorrenciasAluno: TipoOcorrenciaAluno[];
  tipoOcorrenciaAluno: TipoOcorrenciaAluno = new TipoOcorrenciaAluno();

  filtro: FilterAlunos;
  
  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['nomeAluno', 'tipoOcorrencia', 'dataOcorrencia', 'dataCiencia', 'acoes'];
  dataSource: MatTableDataSource<OcorrenciaAluno> = new MatTableDataSource();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;


  constructor(
    private ocorrenciaAlunoService: OcorrenciaAlunoService,
    private tipoOcorrenciaAlunoService: TipoOcorrenciaAlunoService,
    private alunoService: AlunoService,
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


    this.tipoOcorrenciaAlunoService.getAll().subscribe( (tipos: TipoOcorrenciaAluno[]) => {
      this.tiposOcorrenciasAluno = tipos;
    });

    this.consultar();
  }


  limpar() {
    this.mostrarTabela = false;
    this.dataSource.data = [];
    this.msg = '';

    this.tipoOcorrenciaAluno = new TipoOcorrenciaAluno();
    this.filtro = new FilterAlunos();
    this.filtro.aluno = new ComboAluno();
  }

  consultar() {
    if (this.tipoOcorrenciaAluno.id || this.filtro.aluno.id) {
      this.ocorrenciaAlunoService.getFilter(this.tipoOcorrenciaAluno.id, this.filtro.aluno.id)
      .subscribe((ocorrenciasAluno: OcorrenciaAluno[]) => {

        if (!ocorrenciasAluno) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = ocorrenciasAluno ? ocorrenciasAluno : [];
          this.mostrarTabela = true;
          this.verificaMostrarTabela(ocorrenciasAluno);
        }
      });
    } else {
      this.ocorrenciaAlunoService.getAll().subscribe((ocorrenciasAluno: OcorrenciaAluno[]) => {
        this.dataSource.data = ocorrenciasAluno ? ocorrenciasAluno : [];
        this.mostrarTabela = true;
        this.verificaMostrarTabela(ocorrenciasAluno);
      });
    }
  }


  verificaMostrarTabela(ocorrenciasAluno: OcorrenciaAluno[]) {
    if (!ocorrenciasAluno || ocorrenciasAluno.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma ocorrência cadastrada.';
    } else {
      this.mostrarTabela = true;
    }
  }


  atualizar(ocorrenciaAluno: OcorrenciaAluno) {
    this.router.navigate(['/ocorrenciaaluno/cadastrar'], { queryParams: { id: ocorrenciaAluno.id } });
  }

  deletar(ocorrenciaAluno: OcorrenciaAluno) {
    this.chamaCaixaDialogo(ocorrenciaAluno);
  }

  chamaCaixaDialogo(ocorrenciaAluno: OcorrenciaAluno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o tipo de ocorrência ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.ocorrenciaAlunoService.excluir(ocorrenciaAluno.id).subscribe(() => {
          this.consultar();
        });
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
