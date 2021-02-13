import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { Talento } from 'src/app/core/talento';
import { PessoaFisicaService } from 'src/app/services/pessoa-fisica/pessoa-fisica.service';
import { TalentosService } from 'src/app/services/talentos/talentos.service';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { Funcionario } from 'src/app/core/funcionario';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-talento',
  templateUrl: './talento.component.html',
  styleUrls: ['./talento.component.css']
})
export class TalentoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  funcionarios: Funcionario[];
  listaTalentos: Talento[];
  mostrarTabela: boolean = false;
  msg: string;
  funcionario: Funcionario;
  talento: Talento = new Talento()

  displayedColumns: string[] = ['nome', 'dataRespostaTalento', 'nrNotaCompetencia', 'acoes'];
  dataSource: MatTableDataSource<Talento> = new MatTableDataSource();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();


  constructor(
    private talentosService: TalentosService,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.limpar();

    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);
    this.dataSource.paginator = this.paginator;
    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    });

    this.consultar();
  }


  limpar() {
    this.mostrarTabela = false;
    this.talento = new Talento()
    this.funcionario = null;
    this.dataSource.data = [];
    this.msg = '';
  }

  consultar() {
    if (this.funcionario && this.funcionario.pessoasFisica && this.funcionario.pessoasFisica.id) {
      this.talentosService.getByIdPessoaFisica(this.funcionario.pessoasFisica.id).subscribe((talentos: Talento[]) => {
        if (!talentos || talentos.length === 0) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada'
        } else {
          this.dataSource.data = talentos;
          this.mostrarTabela = true;
        }
      },
      () => {
          this.msg = 'Nenhum registro para a pesquisa selecionada'
        });
    } else {
      this.talentosService.getAll().subscribe((talentos: Talento[]) => {
        if (!talentos || talentos.length === 0) {
          this.mostrarTabela = false;
          this.msg = 'Nenhum registro para a pesquisa selecionada';
        } else {
          this.dataSource.data = talentos;
          this.mostrarTabela = true;
        }
      });
    }

  }


  atualizar(talento: Talento) {
    this.router.navigate(['/talento/cadastrar'], { queryParams: { idTalento: talento.id } });
  }

  deletar(talento: Talento) {
    this.chamaCaixaDialogo(talento);
  }

  chamaCaixaDialogo(talento: Talento) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o talento do funcionario?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.talentosService.excluir(talento.id).subscribe(() => {
          this.talento.id = null
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

}
