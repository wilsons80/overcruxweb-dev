import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { AlunoTrabalhando } from 'src/app/core/aluno-trabalhando';
import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { AlunoTrabalhandoService } from 'src/app/services/aluno-trabalhando/aluno-trabalhando.service';
import { ComboAlunoTrabalhando } from 'src/app/core/combo-aluno-trabalhando';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';


export class Filter{
	alunoTrabalhando: ComboAlunoTrabalhando;
}


@Component({
  selector: 'app-aluno-trabalhando',
  templateUrl: './aluno-trabalhando.component.html',
  styleUrls: ['./aluno-trabalhando.component.css']
})
export class AlunoTrabalhandoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  comboAlunoTrabalhando: ComboAlunoTrabalhando[];

  filtro:Filter = new Filter();

  alunosTrabalhando: AlunoTrabalhando[];
  mostrarTabela: boolean = false;
  alunoTrabalhando: AlunoTrabalhando = new AlunoTrabalhando();
  msg: string;
  
  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  displayedColumns: string[] = ['aluno', 'dataInicioAlunoTrabalhando', 'nomeEmpreendimento', 'acoes'];
  dataSource: MatTableDataSource<AlunoTrabalhando> = new MatTableDataSource();

  constructor(
    private alunoTrabalhandoService: AlunoTrabalhandoService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { 
    this.carregarPerfil = new CarregarPerfil();
  }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.carregarCombos();

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.alunoTrabalhando = new AlunoTrabalhando()
    this.dataSource.data = [];
    this.filtro = new Filter();
  }

  consultar() {
    if (this.alunoTrabalhando.id) {
      this.alunoTrabalhandoService.getById(this.alunoTrabalhando.id).subscribe((alunoTrabalhando: AlunoTrabalhando) => {
        if (!AlunoTrabalhando) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [alunoTrabalhando];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }

  }


  atualizar(alunoTrabalhando: AlunoTrabalhando) {
    this.router.navigate(['/alunotrabalhando/cadastrar'], { queryParams: { idAlunoTrabalhando: alunoTrabalhando.id } });
  }

  deletar(alunoTrabalhando: AlunoTrabalhando) {
    this.chamaCaixaDialogo(alunoTrabalhando);
  }

  chamaCaixaDialogo(alunoTrabalhando: AlunoTrabalhando) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o aluno trabalhando ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.alunoTrabalhandoService.excluir(alunoTrabalhando.id).subscribe(() => {
          this.alunoTrabalhando.id = null;
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.alunoTrabalhandoService.getAll().subscribe((alunoTrabalhandos: AlunoTrabalhando[]) => {
      this.alunosTrabalhando = alunoTrabalhandos;
      this.dataSource.data = alunoTrabalhandos ? alunoTrabalhandos : [];
      this.verificaMostrarTabela(alunoTrabalhandos);
    })
  }




  verificaMostrarTabela(alunoTrabalhandos: AlunoTrabalhando[]) {
    if (!alunoTrabalhandos || alunoTrabalhandos.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum aluno trabalhando cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }


  private carregarCombos() {
    this.alunoTrabalhandoService.getAllByCombo().subscribe((alunoTrabalhandos: ComboAlunoTrabalhando[]) => {
      this.comboAlunoTrabalhando = alunoTrabalhandos;

      this.comboAlunoTrabalhando.sort((a,b) => {
        if (a.nome > b.nome) {return 1;}
        if (a.nome < b.nome) {return -1;}
        return 0;
      });
    })
  }

  onValorChange(event: any) {
      this.filtro.alunoTrabalhando = event;
  }
  
}
