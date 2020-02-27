import { ProgramaService } from './../../services/programa/programa.service';
import { Projeto } from './../../core/projeto';
import { Programa } from 'src/app/core/programa';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { Estoques } from './../../core/estoques';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Acesso } from 'src/app/core/acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { EstoquesService } from 'src/app/services/estoques/estoques.service';
import { Material } from 'src/app/core/material';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { MaterialService } from 'src/app/services/material/material.service';
import { EstoqueDialogComponent } from './estoque-dialog/estoque-dialog.component';

class FilterEstoque {
  idPrograma: number;
  idProjeto: number;
  idMaterial: number;
}

@Component({
  selector: 'estoques',
  templateUrl: './estoques.component.html',
  styleUrls: ['./estoques.component.css']
})
export class EstoquesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  programas: Programa[];
  projetos: Projeto[];
  materiais: Material[];


  estoques: Estoques[];
  estoque: Estoques = new Estoques();
  msg: string;

  filterEstoque: FilterEstoque;

  mostrarTabela = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil = new CarregarPerfil();

  displayedColumns: string[] = ['material', 'quantidade', 'quantidademinimo', 'quantidademaxima', 'programa', 'projeto', 'acoes'];
  dataSource: MatTableDataSource<Estoques> = new MatTableDataSource();

  constructor(
    private estoquesService: EstoquesService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private programaService: ProgramaService,
    private projetoService: ProjetoService,
    private materialService: MaterialService
  ) {
    this.carregarPerfil = new CarregarPerfil();
  }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);
    this.dataSource.paginator = this.paginator;

    this.programaService.getAllProgramasIntituicaoLogada().subscribe((programas: Programa[]) => {
      this.programas = programas;
    });

    this.projetoService.getAllIntituicaoLogada().subscribe((projetos: Projeto[]) => {
      this.projetos = projetos;
    });

    this.materialService.getAll().subscribe((materiais: Material[]) => {
      this.materiais = materiais;
    });

    this.filterEstoque = new FilterEstoque();
    this.consultar();
  }


  limpar() {
    this.mostrarTabela = false;
    this.estoque = new Estoques();
    this.dataSource.data = [];
    this.filterEstoque = new FilterEstoque();
  }

  consultar() {
    if (this.filterEstoque.idPrograma || this.filterEstoque.idProjeto || this.filterEstoque.idMaterial) {
      this.estoquesService.getFilter(this.filterEstoque.idMaterial, this.filterEstoque.idPrograma, this.filterEstoque.idProjeto)
      .subscribe((estoques: Estoques[]) => {
        this.estoques = estoques;
        this.dataSource.data = estoques ? estoques : [];
        this.verificaMostrarTabela(estoques);
      });
    }
  }


  visualizar(objetoEstoque: Estoques) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {estoque: objetoEstoque};
    this.dialog.open(EstoqueDialogComponent, dialogConfig);
  }


  verificaMostrarTabela(estoques: Estoques[]) {
    if (!estoques || estoques.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum estoque de material cadastrado.';
    } else {
      this.mostrarTabela = true;
    }
  }

 
}
