import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanosAcao } from 'src/app/core/planos-acao';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { PlanosAcaoService } from 'src/app/services/planosAcao/planos-acao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'app-planos-acao',
  templateUrl: './planos-acao.component.html',
  styleUrls: ['./planos-acao.component.css']
})
export class PlanosAcaoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  listaPlanosAcao: PlanosAcao[];
  mostrarTabela: boolean = false;
  planosAcao: PlanosAcao = new PlanosAcao();
  msg:string;

  displayedColumns: string[] = ['nome', 'iniciativa', 'dataInicio','dataFim', 'acoes'];
  dataSource: MatTableDataSource<PlanosAcao> = new MatTableDataSource();

  perfilAcesso: Acesso;

  
  constructor(
    private planosAcaoService: PlanosAcaoService,
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
    this.planosAcao = new PlanosAcao()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.planosAcao.id) {
      this.planosAcaoService.getById(this.planosAcao.id).subscribe((planosAcao: PlanosAcao) => {
        if(!planosAcao){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [planosAcao];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
   
  }


  atualizar(planosAcao: PlanosAcao) {
    this.router.navigate(['/planosacao/cadastrar'], { queryParams: { idPlanosAcao: planosAcao.id} });
  }

  deletar(planosAcao: PlanosAcao) {
    this.chamaCaixaDialogo(planosAcao);
  }

  chamaCaixaDialogo(planosAcao: PlanosAcao) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o plano de ação ${planosAcao.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.planosAcaoService.excluir(planosAcao.id).subscribe(() => {
          this.planosAcao.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.planosAcaoService.getAll().subscribe((listaPlanosAcao: PlanosAcao[]) => {
      this.listaPlanosAcao = listaPlanosAcao
      this.dataSource.data = listaPlanosAcao ? listaPlanosAcao : [];
      this.verificaMostrarTabela(listaPlanosAcao);
    })
  }

  verificaMostrarTabela(listaPlanosAcao: PlanosAcao[]) {
    if(!listaPlanosAcao ||listaPlanosAcao.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhum plano de ação cadastrado."
    }else{
      this.mostrarTabela = true; 
    }
  }


}
