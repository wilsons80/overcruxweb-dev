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
import { ToastService } from 'src/app/services/toast/toast.service';


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
  msg: string;
  
  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  displayedColumns: string[] = ['aluno', 'dataInicioAlunoTrabalhando', 'nomeEmpreendimento', 'acoes'];
  dataSource: MatTableDataSource<AlunoTrabalhando> = new MatTableDataSource();

  constructor(
    private alunoTrabalhandoService: AlunoTrabalhandoService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) { 
    this.carregarPerfil = new CarregarPerfil();
  }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);
    this.dataSource.paginator = this.paginator;

    this.filtro = new Filter();
    this.filtro.alunoTrabalhando = new ComboAlunoTrabalhando();
    
    this.carregarCombos();
  }


  limpar() {
    this.mostrarTabela = false;
    this.dataSource.data = [];
    this.filtro = new Filter();
    this.filtro.alunoTrabalhando = new ComboAlunoTrabalhando();
  }

  consultar() {
    if (this.filtro.alunoTrabalhando && this.filtro.alunoTrabalhando.id) {
      this.alunoTrabalhandoService.getById(this.filtro.alunoTrabalhando.id)
      .subscribe((alunoTrabalhando: AlunoTrabalhando) => {
        if(alunoTrabalhando){
          this.dataSource.data = [alunoTrabalhando];
          this.mostrarTabela = true;
        } else {
          this.verificaMostrarTabela(this.dataSource.data)
        }
      })
    } else {
      this.toastService.showAlerta('Selecione um beneficiário para realizar a pesquisa.');
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
          this.filtro.alunoTrabalhando.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    });
  }


  verificaMostrarTabela(alunoTrabalhandos: AlunoTrabalhando[]) {
    if (!alunoTrabalhandos || alunoTrabalhandos.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum registro cadastrado."
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

  onValorChange(registro: any) {
    if(registro) {
      this.filtro.alunoTrabalhando.id = registro.id;
    } else {
      this.filtro.alunoTrabalhando = null;
    }
  }
  
}
