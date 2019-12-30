import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/core/empresa';
import { Acesso } from 'src/app/core/acesso';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  empresas: Empresa[];
  mostrarTabela = false;
  empresa: Empresa = new Empresa();
  msg: string;


  displayedColumns: string[] = ['codigo', 'nomeRazaoSocial', 'cnpj', 'telefone', 'ativa', 'acoes'];

  perfilAcesso: Acesso;



  dataSource: MatTableDataSource<Empresa> = new MatTableDataSource();

  constructor(
    private empresaService: EmpresaService,
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
    this.empresa = new Empresa()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.empresa.id) {
      this.empresaService.getById(this.empresa.id).subscribe((empresa: Empresa) => {
        if (!empresa) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [empresa];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(empresa: Empresa) {
    this.router.navigate(['/empresa/cadastrar'], { queryParams: { idEmpresa: empresa.id } });
  }

  deletar(empresa: Empresa) {
    this.chamaCaixaDialogo(empresa);
  }

  chamaCaixaDialogo(empresa: Empresa) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir a empresa?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.empresaService.excluir(empresa.id).subscribe(() => {
          this.empresa.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.empresaService.getAll().subscribe((empresas: Empresa[]) => {
      this.empresas = empresas;
      this.dataSource.data = empresas ? empresas : [];
      this.verificaMostrarTabela(empresas);
    })
  }

  verificaMostrarTabela(empresas: Empresa[]) {
    if (!empresas || empresas.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhuma empresa cadastrada."
    } else {
      this.mostrarTabela = true;
    }
  }
}
