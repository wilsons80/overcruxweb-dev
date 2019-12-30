import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Indicadores } from './../../core/indicadores';
import { IndicadoresService } from './../../services/indicadores/indicadores.service';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaIndicadores: Indicadores[];
  mostrarTabela: boolean = false;
  indicadores: Indicadores = new Indicadores();
  msg: string;

  displayedColumns: string[] = ['nome', 'objetivo', 'dataInicio', 'dataFim', 'acoes'];
  dataSource: MatTableDataSource<Indicadores> = new MatTableDataSource();
  perfilAcesso: Acesso;


  constructor(
    private indicadoresService: IndicadoresService,
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
    this.indicadores = new Indicadores()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.indicadores.idIndicador) {
      this.indicadoresService.getById(this.indicadores.idIndicador).subscribe((indicadores: Indicadores) => {
        if (!indicadores) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [indicadores];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(indicadores: Indicadores) {
    this.router.navigate(['/indicadores/cadastrar'], { queryParams: { idIndicador: indicadores.idIndicador } });
  }

  deletar(indicadores: Indicadores) {
    this.chamaCaixaDialogo(indicadores);
  }

  chamaCaixaDialogo(indicadores: Indicadores) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o departamento ${indicadores.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.indicadoresService.excluir(indicadores.idIndicador).subscribe(() => {
          this.indicadores.idIndicador = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.indicadoresService.getAll().subscribe((indicadores: Indicadores[]) => {
      this.listaIndicadores = indicadores;
      this.dataSource.data = indicadores ? indicadores : [];
      this.verificaMostrarTabela(indicadores);
    })
  }

  verificaMostrarTabela(indicadores: Indicadores[]) {
    if (!indicadores || indicadores.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum indicador cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }

}
