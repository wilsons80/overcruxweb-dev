import { ContasBancariaService } from './../../services/contas-bancaria/contas-bancaria.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { ContasBancaria } from 'src/app/core/contas-bancaria';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { CategoriasContabeisService } from 'src/app/services/categorias-contabeis/categorias-contabeis.service';
import { PlanosContas } from 'src/app/core/planos-contas';
import * as _ from 'lodash';

@Component({
  selector: 'contas-bancarias',
  templateUrl: './contas-bancarias.component.html',
  styleUrls: ['./contas-bancarias.component.css']
})
export class ContasBancariasComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  listaContasBancarias: ContasBancaria[];
  mostrarTabela: boolean = false;
  contasBancaria: ContasBancaria = new ContasBancaria();
  msg: string;

  displayedColumns: string[] = ['banco', 'numeroAgencia', 'numeroContaBancaria','nomeTitular', 'codigoPlanoConta', 'acoes'];
  dataSource: MatTableDataSource<ContasBancaria> = new MatTableDataSource();
  
  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();
  planosContas: PlanosContas[];

  constructor(
    private contasBancariaService: ContasBancariaService,
    private categoriasContabeisService: CategoriasContabeisService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.categoriasContabeisService.getAllViewPlanosContas().subscribe((planosContas: PlanosContas[]) => {
      this.planosContas = planosContas;
    })

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.contasBancaria = new ContasBancaria()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.contasBancaria.id) {
      this.contasBancariaService.getById(this.contasBancaria.id).subscribe((contasBancaria: ContasBancaria) => {
        if (!contasBancaria) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [contasBancaria];
          this.mostrarTabela = true;
        }
      },
        (retorno) => {
          this.mostrarTabela = false
          this.msg = retorno.error.mensagem
        }
      )
    } else {
      this.getAll();
    }

  }


  atualizar(contasBancaria: ContasBancaria) {
    this.router.navigate(['/contasbancarias/cadastrar'], { queryParams: { id: contasBancaria.id } });
  }

  deletar(contasBancaria: ContasBancaria) {
    this.chamaCaixaDialogo(contasBancaria);
  }

  chamaCaixaDialogo(contasBancaria: ContasBancaria) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.contasBancariaService.excluir(contasBancaria.id).subscribe(() => {
          this.contasBancaria.id = null;
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.contasBancariaService.getAll().subscribe((listaContasBancarias: ContasBancaria[]) => {
      this.listaContasBancarias = listaContasBancarias;
      this.dataSource.data = listaContasBancarias ? listaContasBancarias : [];
      this.verificaMostrarTabela(listaContasBancarias);
    })
  }

  verificaMostrarTabela(listaContas: ContasBancaria[]) {
    if (!listaContas || listaContas.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma conta bancária cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }

  getPlanoConta(id): string {
    const registro = _.find(this.planosContas,  (c) => c.id === id);
    return registro ? registro.codigoCategoriaContabil : "";
  }

}
