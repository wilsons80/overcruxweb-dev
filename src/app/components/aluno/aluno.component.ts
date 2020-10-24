import { AfterContentInit, Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Aluno } from 'src/app/core/aluno';
import { Router, ActivatedRoute } from '@angular/router';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Acesso } from 'src/app/core/acesso';
import { FilterAlunos } from 'src/app/core/filter-alunos';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css'],
  providers: [CpfPipe],
})
export class AlunoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 
  alunosCombo: Aluno[];
  alunos: Aluno[];
  filtro: FilterAlunos;

  mostrarTabela = false;
  msg: string;

  displayedColumns: string[] = ['matricula', 'nome', 'turno', 'serie', 'dataEntrada', 'dataDesligamento', 'acoes'];
  dataSource: MatTableDataSource<Aluno> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(
    private alunoService: AlunoService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute:ActivatedRoute,
    private cpfPipe: CpfPipe 
  ) { 
    this.filtro = this.alunoService.filtro;
  }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];
    this.dataSource.paginator = this.paginator;

    this.carregarCombos();    
    this.consultar();
  }


  limpar() {
    this.mostrarTabela = false;
    this.dataSource.data = [];
    this.filtro = (this.alunoService.filtro = new FilterAlunos());
    this.alunoService.initFiltro();
  }

  consultar() {   
    if (this.filtro.aluno.id || this.filtro.maeAluno.id || this.filtro.cpfAluno.id) {
      this.alunoService.getFilter(this.filtro.aluno.id,  
                                  this.filtro.maeAluno.pessoaFisica.id, 
                                  this.filtro.cpfAluno.pessoaFisica.cpf)
      .subscribe((alunos: Aluno[]) => {
        this.verificaMostrarTabela(alunos);
      });
    } else {
      this.getAll();
    }
  }

  atualizar(aluno: Aluno) {
    this.router.navigate(['/aluno/cadastrar'], { queryParams: { id: aluno.id } });
  }

  deletar(aluno: Aluno) {
    this.chamaCaixaDialogo(aluno);
  }

  chamaCaixaDialogo(aluno: Aluno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o Aluno ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.alunoService.excluir(aluno.id).subscribe(() => {
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    });
  }

  getAll() {
    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunos = alunos;
      this.dataSource.data = alunos ? alunos : [];
      this.verificaMostrarTabela(alunos);
    });
  }

  verificaMostrarTabela(alunos: Aluno[]) {
    if (!alunos ||alunos.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum aluno encontrado.';
    } else {
      this.mostrarTabela = true;
    }
  }

  carregarCombos(){
    this.alunoService.getAll().subscribe((alunos: Aluno[]) => {
      this.alunosCombo = alunos;
      this.alunosCombo.forEach(a => {
        a.nome    = a.pessoaFisica.nome;
        a.nomeMae = a.pessoaFisica.nomeMae;
        a.cpf     = this.cpfPipe.transform(a.pessoaFisica.cpf || '00000000000');
      })
    });
  }


}
