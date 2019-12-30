import { PessoaFisica } from './../../core/pessoa-fisica';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/core/funcionario';
import { Acesso } from 'src/app/core/acesso';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { TipoFuncionario } from 'src/app/core/tipo-funcionario';
import * as _ from 'lodash';
import { Departamento } from 'src/app/core/departamento';
import { Dependentes } from 'src/app/core/dependentes';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  funcionarios: Funcionario[];
  mostrarTabela: boolean = false;
  funcionario: Funcionario = new Funcionario();
  msg: string;
  perfilAcesso: Acesso;

  tiposFuncionario: TipoFuncionario = new TipoFuncionario();

  displayedColumns: string[] = ['matricula', 'nome', 'dataAdmissao', 'tipoFuncionario', 'cargo', 'acoes'];
  dataSource: MatTableDataSource<Funcionario> = new MatTableDataSource();

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.funcionario = new Funcionario()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.funcionario.id) {
      this.funcionarioService.getById(this.funcionario.id).subscribe((funcionario: Funcionario) => {
        if (!Funcionario) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [funcionario];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }

  }

  atualizar(Funcionario: Funcionario) {
    this.router.navigate(['/funcionario/cadastrar'], { queryParams: { idFuncionario: Funcionario.id } });
  }

  deletar(Funcionario: Funcionario) {
    this.chamaCaixaDialogo(Funcionario);
  }

  chamaCaixaDialogo(funcionario: Funcionario) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o Funcionario ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.funcionarioService.excluir(funcionario.id).subscribe(() => {
          this.funcionario.id = null;
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
      this.dataSource.data = funcionarios ? funcionarios : [];
      this.verificaMostrarTabela(funcionarios);
    })
  }

  verificaMostrarTabela(funcionarios: Funcionario[]) {
    if (!funcionarios || funcionarios.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum Funcionário cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }

}
