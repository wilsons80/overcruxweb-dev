import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Cargo } from 'src/app/core/cargo';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Acesso } from 'src/app/core/acesso';
import { TipoCargo } from 'src/app/core/tipo-cargo';
import * as _ from 'lodash';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  cargos: Cargo[];
  cargo: Cargo = new Cargo();
  msg: string;

  mostrarTabela = false;

  perfilAcesso: Acesso;

  displayedColumns: string[] = ['codigo', 'nome', 'tipoCargo','acoes'];
  dataSource: MatTableDataSource<Cargo> = new MatTableDataSource();


  tiposCargo: TipoCargo = new TipoCargo();

  constructor(
    private cargoService: CargosService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute:ActivatedRoute

  ) { }

  ngOnInit() {
    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.cargo = new Cargo()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.cargo.id) {
      this.cargoService.getById(this.cargo.id).subscribe((cargo: Cargo) => {
        if (!cargo) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [cargo];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(cargo: Cargo) {
    this.router.navigate(['/cargo/cadastrar'], { queryParams: { idCargo: cargo.id } });
  }

  deletar(cargo: Cargo) {
    this.chamaCaixaDialogo(cargo);
  }

  chamaCaixaDialogo(cargo: Cargo) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o cargo ${cargo.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.cargoService.excluir(cargo.id).subscribe(() => {
          this.cargo.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.cargoService.getAll().subscribe((cargos: Cargo[]) => {
      this.cargos = cargos;
      this.dataSource.data = cargos ? cargos : [];
      this.verificaMostrarTabela(cargos);
    })
  }

  verificaMostrarTabela(cargos: Cargo[]) {
    if (!cargos || cargos.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum cargo cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }

}
