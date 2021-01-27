import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Router, ActivatedRoute } from '@angular/router';
import { Projeto } from 'src/app/core/projeto';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  projetos: Projeto[];
  projeto: Projeto = new Projeto();
  msg:string;

  mostrarTabela = false;

  displayedColumns: string[] = ['nome', 'dataPrevisaoInicio', 'dataInicio', 'dataFim', 'restricao', 'acoes'];
  dataSource: MatTableDataSource<Projeto> = new MatTableDataSource();

  perfilAcesso: Acesso;

  constructor(
    private projetoService: ProjetoService,
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
    this.projeto = new Projeto()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.projeto.id) {
      this.projetoService.getById(this.projeto.id).subscribe((projeto: Projeto) => {
        if(!projeto){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [projeto];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(projeto: Projeto) {
    this.router.navigate(['/projetos/cadastrar'], { queryParams: { idProjeto: projeto.id } });
  }

  deletar(projeto: Projeto) {
    this.chamaCaixaDialogo(projeto);
  }

  chamaCaixaDialogo(projeto: Projeto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o projeto ${projeto.nome}?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.projetoService.excluir(projeto.id).subscribe(() => {
          this.projeto.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.projetoService.getAllIntituicaoLogada().subscribe((projetos: Projeto[]) => {
      this.projetos = projetos;
      this.dataSource.data = projetos ? projetos : [];
      this.verificaMostrarTabela(projetos);
    })
  }
  verificaMostrarTabela(projetos: Projeto[]) {
    if(!projetos ||projetos.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhum projeto cadastrado."
    }else{
      this.mostrarTabela = true; 
    }
  }

}
