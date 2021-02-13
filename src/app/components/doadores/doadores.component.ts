import { SituacoesExAlunosService } from 'src/app/services/situacoes-ex-alunos/situacoes-ex-alunos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { Doadores } from 'src/app/core/doadores';
import { DoadoresService } from 'src/app/services/doadores/doadores.service';
import { Combo } from 'src/app/core/combo';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';


export class Filter{
	elm: Combo;
}
@Component({
  selector: 'doadores',
  templateUrl: './doadores.component.html',
  styleUrls: ['./doadores.component.css']
})
export class DoadoresComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  
  
  listaDoadores: Doadores[];
  doadores: Doadores = new Doadores();
  msg:string;
  
  filtro:Filter = new Filter();
  listaCombo:Combo[];

  mostrarTabela = false;

  displayedColumns: string[] = ['tipoDoador', 'nomepf','nomepj', 'dataInicioVinculo', 'acoes'];
  dataSource: MatTableDataSource<Doadores> = new MatTableDataSource();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  constructor(
    private doadoresService: DoadoresService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute:ActivatedRoute

  ) { 
  }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);
    
    this.dataSource.paginator = this.paginator;

    this.filtro = new Filter();
    this.filtro.elm = new Combo();
    
    this.carregarCombos();
    this.getAll();
  }
  limpar() {
    this.mostrarTabela = false;
    this.doadores = new Doadores()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.filtro.elm && this.filtro.elm.id) {
      this.doadoresService.getById(this.filtro.elm.id).subscribe((doadores: Doadores) => {
        if(!doadores){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [doadores];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(doadores: Doadores) {
    this.router.navigate(['/doadores/cadastrar'], { queryParams: { id: doadores.id } });
  }

  deletar(doadores: Doadores) {
    this.chamaCaixaDialogo(doadores);
  }

  chamaCaixaDialogo(doadores: Doadores) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.doadoresService.excluir(doadores.id).subscribe(() => {
          this.doadores.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.doadoresService.getAll().subscribe((listaDoadores: Doadores[]) => {
      this.listaDoadores = listaDoadores;
      this.dataSource.data = listaDoadores ? listaDoadores : [];
      this.verificaMostrarTabela(listaDoadores);
    })
  }
  verificaMostrarTabela(listaDoadores: Doadores[]) {
    if(!listaDoadores ||listaDoadores.length == 0) {
      this.mostrarTabela = false; 
      this.msg = "Nenhum cadastro."
    }else{
      this.mostrarTabela = true; 
    }
  }

  private carregarCombos() {
    this.doadoresService.getAllByCombo().subscribe((listaCombo: Combo[]) => {
      this.listaCombo = listaCombo;

      this.listaCombo.sort((a,b) => {
        if (a.nome > b.nome) {return 1;}
        if (a.nome < b.nome) {return -1;}
        return 0;
      });
    })
  }
}
