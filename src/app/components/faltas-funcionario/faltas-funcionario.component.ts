import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';
import { FaltasFuncionario } from 'src/app/core/faltas-funcionario';
import { Funcionario } from 'src/app/core/funcionario';
import { Acesso } from 'src/app/core/acesso';
import { FaltasFuncionarioService } from 'src/app/services/faltas-funcionario/faltas-funcionario.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-faltas-funcionario',
  templateUrl: './faltas-funcionario.component.html',
  styleUrls: ['./faltas-funcionario.component.css']
})
export class FaltasFuncionarioComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaFaltasFuncionario: FaltasFuncionario[];
  listaFuncionarios: Funcionario[];
  mostrarTabela = false;
  faltasFuncionario: FaltasFuncionario = new FaltasFuncionario();
  msg: string;
  funcionario: Funcionario;

  displayedColumns: string[] = ['funcionarioFaltou', 'funcionarioCadastrouFalta', 'dataFaltaFuncionario', 'acoes'];
  dataSource: MatTableDataSource<FaltasFuncionario> = new MatTableDataSource();

  perfilAcesso: Acesso;



  constructor(
    private faltasFuncionarioService: FaltasFuncionarioService,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];


    this.dataSource.paginator = this.paginator;
    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.listaFuncionarios = funcionarios;
    })

  }


  limpar() {
    this.mostrarTabela = false;
    this.faltasFuncionario = new FaltasFuncionario()
    this.funcionario = null;
    this.dataSource.data = [];
    this.msg = '';
  }

  consultar() {
    this.faltasFuncionarioService.getPorFuncionario(this.funcionario.id).subscribe((faltasFuncionario: FaltasFuncionario[]) => {
      if (!faltasFuncionario) {
        this.mostrarTabela = false
        this.msg = "Nenhuma falta para o funcionário selecionado."
      } else {
        this.dataSource.data = faltasFuncionario;
        this.mostrarTabela = true;
      }
    },
      () => {
        this.msg = "Nenhum registro para a pesquisa selecionada"
      }
    )

  }


  atualizar(faltasFuncionario: FaltasFuncionario) {
    this.router.navigate(['/faltasfuncionario/cadastrar'], { queryParams: { idFaltaFuncionario: faltasFuncionario.id } });
  }

  deletar(faltasFuncionario: FaltasFuncionario) {
    this.chamaCaixaDialogo(faltasFuncionario);
  }

  chamaCaixaDialogo(faltasFuncionario: FaltasFuncionario) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a falta do funcionario?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.faltasFuncionarioService.excluir(faltasFuncionario.id).subscribe(() => {
          this.faltasFuncionario.id = null
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }


}
