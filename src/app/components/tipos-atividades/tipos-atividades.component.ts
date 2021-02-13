import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { TiposAtividades } from 'src/app/core/tipos-atividades';
import { TiposAtividadesService } from 'src/app/services/tipos-atividades/tipos-atividades.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'tipos-atividades',
  templateUrl: './tipos-atividades.component.html',
  styleUrls: ['./tipos-atividades.component.css']
})
export class TiposAtividadesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  tiposAtividades: TiposAtividades[];
  tipoAtividade: TiposAtividades = new TiposAtividades();
  msg: string;

  mostrarTabela = false;

  displayedColumns: string[] = ['id', 'descricao', 'instituicao', 'acoes'];
  dataSource: MatTableDataSource<TiposAtividades> = new MatTableDataSource();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();


  constructor(
    private tipoAtividadeService: TiposAtividadesService,
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
    this.tipoAtividade = new TiposAtividades()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.tipoAtividade.id) {
      this.tipoAtividadeService.getById(this.tipoAtividade.id).subscribe((tipoAtividade: TiposAtividades) => {
        if (!tipoAtividade) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [tipoAtividade];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(tipoAtividade: TiposAtividades) {
    this.router.navigate(['/tiposatividades/cadastrar'], { queryParams: { idTiposAtividades: tipoAtividade.id } });
  }

  deletar(tipoAtividade: TiposAtividades) {
    this.chamaCaixaDialogo(tipoAtividade);
  }

  chamaCaixaDialogo(tipoAtividade: TiposAtividades) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o Tipo Atividade ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.tipoAtividadeService.excluir(tipoAtividade.id).subscribe(() => {
          this.tipoAtividade.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.tipoAtividadeService.getAll().subscribe((tiposAtividades: TiposAtividades[]) => {
      console.log("proejtos", tiposAtividades)
      this.tiposAtividades = tiposAtividades;
      this.dataSource.data = tiposAtividades ? tiposAtividades : [];
      this.verificaMostrarTabela(tiposAtividades);
    })
  }
  verificaMostrarTabela(tiposAtividades: TiposAtividades[]) {
    if (!tiposAtividades || tiposAtividades.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum tipoAtividade cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }

}
