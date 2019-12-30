import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Objetivo } from 'src/app/core/objetivo';
import { Acesso } from 'src/app/core/acesso';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { ObjetivoService } from './../../services/objetivo/objetivo.service';

@Component({
  selector: 'app-objetivo',
  templateUrl: './objetivo.component.html',
  styleUrls: ['./objetivo.component.css']
})
export class ObjetivoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  objetivos: Objetivo[];
  mostrarTabela: boolean = false;
  objetivo: Objetivo = new Objetivo();
  msg: string;

  displayedColumns: string[] = ['nome', 'perspectiva', 'dataImplantacao', 'acoes'];
  dataSource: MatTableDataSource<Objetivo> = new MatTableDataSource();

  perfilAcesso: Acesso;


  constructor(
    private objetivoService: ObjetivoService,
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
    this.objetivo = new Objetivo()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.objetivo.idObjetivo) {
      this.objetivoService.getById(this.objetivo.idObjetivo).subscribe((objetivo: Objetivo) => {
        if (!objetivo) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [objetivo];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }

  }


  atualizar(objetivo: Objetivo) {
    this.router.navigate(['/objetivo/cadastrar'], { queryParams: { idObjetivo: objetivo.idObjetivo } });
  }

  deletar(objetivo: Objetivo) {
    this.chamaCaixaDialogo(objetivo);
  }

  chamaCaixaDialogo(objetivo: Objetivo) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o objetivo ${objetivo.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.objetivoService.excluir(objetivo.idObjetivo).subscribe(() => {
          this.objetivo.idObjetivo = null
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.objetivoService.getAll().subscribe((objetivos: Objetivo[]) => {
      console.log("getall",objetivos)
      this.objetivos = objetivos;
      this.dataSource.data = objetivos ? objetivos : [];
      this.verificaMostrarTabela(objetivos);
    })
  }
  verificaMostrarTabela(objetivos: Objetivo[]) {
    if (!objetivos || objetivos.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum objetivo cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }
}
