import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import { CondicoesMoradia } from 'src/app/core/condicoes-moradia';
import { CondicoesMoradiaService } from 'src/app/services/condicoes-moradia/condicoes-moradia.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'condicao-moradia',
  templateUrl: './condicao-moradia.component.html',
  styleUrls: ['./condicao-moradia.component.css']
})
export class CondicaoMoradiaComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  condicoesMoradia: CondicoesMoradia[];
  condicaoMoradia: CondicoesMoradia = new CondicoesMoradia();
  mostrarTabela = false;
  msg: string;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();
  
  displayedColumns: string[] = ['descricao', 'acoes'];
  dataSource: MatTableDataSource<CondicoesMoradia> = new MatTableDataSource();

  constructor(
    private condicaoMoradiaService: CondicoesMoradiaService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.condicaoMoradia = new CondicoesMoradia();
    this.dataSource.data = [];
  }

  consultar() {
    if (this.condicaoMoradia.id) {
      this.condicaoMoradiaService.getById(this.condicaoMoradia.id).subscribe((condicaoMoradia: CondicoesMoradia) => {
        if (!condicaoMoradia){
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = [condicaoMoradia];
          this.mostrarTabela = true;
        }
      });
    } else {
      this.getAll();
    }
  }


  atualizar(condicaoMoradia: CondicoesMoradia) {
    this.router.navigate(['/condicaomoradia/cadastrar'], { queryParams: { id: condicaoMoradia.id } });
  }

  deletar(condicaoMoradia: CondicoesMoradia) {
    this.chamaCaixaDialogo(condicaoMoradia);
  }

  chamaCaixaDialogo(condicaoMoradia: CondicoesMoradia) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a condição de moradia: ${condicaoMoradia.descricao}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.condicaoMoradiaService.excluir(condicaoMoradia.id).subscribe(() => {
          this.condicaoMoradia.id = null;
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.condicaoMoradiaService.getAll().subscribe((condicoesMoradia: CondicoesMoradia[]) => {
      this.condicoesMoradia = condicoesMoradia;
      this.dataSource.data = condicoesMoradia ? condicoesMoradia : [];
      this.verificaMostrarTabela(condicoesMoradia);
    })
  }

  verificaMostrarTabela(condicoesMoradia: CondicoesMoradia[]) {
    if (!condicoesMoradia || condicoesMoradia.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhuma condição de moradia cadastrada.';
    } else {
      this.mostrarTabela = true;
    }
  }


}
