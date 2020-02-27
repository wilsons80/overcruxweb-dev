import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Aluno } from 'src/app/core/aluno';
import { EntidadesSociais } from 'src/app/core/entidades-sociais';
import { Acesso } from 'src/app/core/acesso';
import { EncaminhamentoAluno } from 'src/app/core/encaminhamento-aluno';
import { Router, ActivatedRoute } from '@angular/router';
import { EncaminhamentoAlunoService } from 'src/app/services/encaminhamento-aluno/encaminhamento-aluno.service';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { Empresa } from 'src/app/core/empresa';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { EntidadeSocialService } from 'src/app/services/entidade-social/entidade-social.service';

@Component({
  selector: 'encaminhamento-aluno',
  templateUrl: './encaminhamento-aluno.component.html',
  styleUrls: ['./encaminhamento-aluno.component.css']
})
export class EncaminhamentoAlunoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  alunos: Aluno[];
  aluno: Aluno = new Aluno();

  entidadesSociais: EntidadesSociais[];
  entidadeSocial: EntidadesSociais = new EntidadesSociais();

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['aluno', 'entidadesocial', 'cnpj', 'ativa', 'acoes'];
  perfilAcesso: Acesso;

  dataSource: MatTableDataSource<EncaminhamentoAluno> = new MatTableDataSource();

  constructor(
    private encaminhamentoAlunoService: EncaminhamentoAlunoService,
    private alunoService: AlunoService,
    private entidadeSocialService: EntidadeSocialService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;
    this.getAll();

    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
    });

    this.entidadeSocialService.getAll().subscribe((entidadesSociais: EntidadesSociais[]) => {
      this.entidadesSociais = entidadesSociais;
    });
  }


  limpar() {
    this.aluno = new Aluno();
    this.aluno.pessoaFisica = new PessoaFisica();

    this.entidadeSocial = new EntidadesSociais();
    this.entidadeSocial.empresa = new Empresa();

    this.mostrarTabela = false;
    this.dataSource.data = [];
  }

  consultar() {
    if (this.entidadeSocial.id) {
      this.encaminhamentoAlunoService.getAllFiltro(this.aluno.id, this.entidadeSocial.id)
       .subscribe((encaminhamentoAluno: EncaminhamentoAluno[]) => {
        if (!encaminhamentoAluno) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = encaminhamentoAluno;
          this.mostrarTabela = true;
        }
      });
    } else {
      this.getAll();
    }
  }


  atualizar(encaminhamentoAluno: EncaminhamentoAluno) {
    this.router.navigate(['/encaminhamentoaluno/cadastrar'], { queryParams: { id: encaminhamentoAluno.id } });
  }

  deletar(encaminhamentoAluno: EncaminhamentoAluno) {
    this.chamaCaixaDialogo(encaminhamentoAluno);
  }

  chamaCaixaDialogo(encaminhamentoAluno: EncaminhamentoAluno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o encaminhamento do aluno ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.encaminhamentoAlunoService.excluir(encaminhamentoAluno.id).subscribe(() => {
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    });
  }

  getAll() {
    this.encaminhamentoAlunoService.getAll().subscribe((encaminhamentoAluno: EncaminhamentoAluno[]) => {
      this.dataSource.data = encaminhamentoAluno ? encaminhamentoAluno : [];
      this.verificaMostrarTabela(encaminhamentoAluno);
    });
  }

  verificaMostrarTabela(encaminhamentoAluno: EncaminhamentoAluno[]) {
    if (!encaminhamentoAluno || encaminhamentoAluno.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma encaminhamento de aluno cadastrado.';
    } else {
      this.mostrarTabela = true;
    }
  }
}
