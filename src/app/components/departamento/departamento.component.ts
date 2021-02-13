import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Departamento } from './../../core/departamento';
import { DepartamentoService } from './../../services/departamento/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  departamentos: Departamento[];
  mostrarTabela: boolean = false;
  departamento: Departamento = new Departamento();
  msg: string;

  displayedColumns: string[] = ['sigla', 'nome', 'unidade', 'acoes'];
  dataSource: MatTableDataSource<Departamento> = new MatTableDataSource();
  
  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.departamento = new Departamento()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.departamento.idDepartamento) {
      this.departamentoService.getById(this.departamento.idDepartamento).subscribe((departamento: Departamento) => {
        if (!departamento) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [departamento];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }

  }


  atualizar(departamento: Departamento) {
    this.router.navigate(['/departamento/cadastrar'], { queryParams: { idDepartamento: departamento.idDepartamento } });
  }

  deletar(departamento: Departamento) {
    this.chamaCaixaDialogo(departamento);
  }

  chamaCaixaDialogo(departamento: Departamento) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o departamento ${departamento.cdUnidadeDepartamento}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.departamentoService.excluir(departamento.idDepartamento).subscribe(() => {
          this.departamento.idDepartamento = null;
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.departamentoService.getAll().subscribe((departamentos: Departamento[]) => {
      this.departamentos = departamentos;
      this.dataSource.data = departamentos ? departamentos : [];
      this.verificaMostrarTabela(departamentos);
    })
  }

  verificaMostrarTabela(departamentos: Departamento[]) {
    if (!departamentos || departamentos.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum departamento cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }


}

