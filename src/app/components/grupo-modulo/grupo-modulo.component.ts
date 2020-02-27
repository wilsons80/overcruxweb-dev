import { Modulo } from './../../core/modulo';
import { UsuarioUnidade } from './../../core/usuario-unidade';
import { GrupoModulo } from './../../core/grupo-modulo';
import { GrupoModuloService } from './../../services/grupo-modulo/grupo-modulo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Unidade } from 'src/app/core/unidade';
import { Acesso } from 'src/app/core/acesso';
import { MatDialog} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { UsuarioUnidadeService } from 'src/app/services/usuario-unidade/usuario-unidade.service';
import { UsuariosUnidades } from 'src/app/core/usuarios-unidades';
import { ModuloService } from 'src/app/services/modulo/modulo.service';
import * as _ from 'lodash';


@Component({
  selector: 'grupo-modulo',
  templateUrl: './grupo-modulo.component.html',
  styleUrls: ['./grupo-modulo.component.css']
})
export class GrupoModuloComponent implements OnInit {

  usuarioUnidades: UsuariosUnidades[];
  usuarioUnidade: UsuariosUnidades = new UsuariosUnidades();

  modulos: Modulo[];
  modulo: Modulo = new Modulo();

  perfilAcesso: Acesso;

  mostrarTabela = false;
  msg: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['unidade', 'nomemodulo', 'permissao', 'acoes'];
  dataSource: MatTableDataSource<GrupoModulo> = new MatTableDataSource();

  constructor(private grupoModuloService: GrupoModuloService,
              private usuarioUnidadeService: UsuarioUnidadeService,
              private moduloService: ModuloService,
              private router: Router,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.limpar();

    this.perfilAcesso =  this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.consultar();

    this.usuarioUnidadeService.getUnidadesUsuarioLogadoTemAcesso()
    .subscribe((unidades: UsuariosUnidades[]) => {
      this.usuarioUnidades = unidades;
    });

    this.moduloService.getAll().subscribe((modulos: Modulo[]) => {
      this.modulos = modulos;
    });
  }

  limpar() {
    this.modulo = new Modulo();
    this.usuarioUnidade.unidade = new Unidade();

    this.mostrarTabela = false;
    this.dataSource.data = [];
  }

  consultar() {
    const idInstituicaoBusca = this.usuarioUnidade.unidade.instituicao ? this.usuarioUnidade.unidade.instituicao.id : '';
    const idModuloBusca  = this.modulo ? this.modulo.id : '';

    if (idInstituicaoBusca || idModuloBusca) {
      this.grupoModuloService.getAllByInstituicaoAndModulo(idInstituicaoBusca, idModuloBusca)
      .subscribe((gruposModulos: GrupoModulo[]) => {
        this.verificaMostrarTabela(gruposModulos);
      });
    } else {
      this.grupoModuloService.getAll().subscribe((gruposModulos: GrupoModulo[]) => {
        this.verificaMostrarTabela(gruposModulos);
      });
    }
  }


  verificaMostrarTabela(gruposModulos: GrupoModulo[]) {
    if (!gruposModulos || gruposModulos.length === 0) {
      this.mostrarTabela = false;
      this.msg = 'Nenhum registro para a pesquisa selecionada';
    } else {

      // Tira os módulos PAI
      const filhos = _.filter(gruposModulos, g => g.modulo.moduloPai);
      const dados: any = filhos.filter((f: any) => !filhos.find( (r: any) => r.modulo.moduloPai.id === f.modulo.id) );

      this.dataSource.data = dados;
      this.mostrarTabela = true;
    }
  }

  atualizar(grupoModulo: GrupoModulo) {
    this.router.navigate(['/grupomodulo/cadastrar'], { queryParams: { id: grupoModulo.id } });
  }

  deletar(grupoModulo: GrupoModulo) {
    this.chamaCaixaDialogo(grupoModulo);
  }

  chamaCaixaDialogo(grupoModulo: GrupoModulo) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o módulo ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.grupoModuloService.excluir(grupoModulo.id).subscribe(() => {
          this.consultar();
        });
      } else {
        dialogRef.close();
      }
    });
  }

}
