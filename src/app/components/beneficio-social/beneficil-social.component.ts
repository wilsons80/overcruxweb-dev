import { SituacoesExAlunosService } from 'src/app/services/situacoes-ex-alunos/situacoes-ex-alunos.service';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
import {BeneficioSocial} from '../../core/beneficio-social';
import {BeneficioSocialService} from '../../services/beneficio-social/beneficio-social';


export class Filter{
	elm: BeneficioSocial;
}
@Component({
  selector: 'beneficil-social',
  templateUrl: './beneficil-social.component.html',
  styleUrls: ['./beneficil-social.component.css']
})
export class BeneficilSocialComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  listaBeneficioSocial: BeneficioSocial[];
  beneficioSocial: BeneficioSocial = new BeneficioSocial();
  msg:string;


  filtro:Filter = new Filter();
  listaCombo:BeneficioSocial[];

  mostrarTabela = false;

  displayedColumns: string[] = [ 'nome','origem', 'acoes'];
  dataSource: MatTableDataSource<BeneficioSocial> = new MatTableDataSource();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  constructor(
    private beneficioSocialService: BeneficioSocialService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute:ActivatedRoute

  ) {
  }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.dataSource.paginator = this.paginator;

    this.filtro = new Filter();
    this.filtro.elm = new BeneficioSocial();

    this.carregarCombos();
    this.getAll();
  }
  limpar() {
    this.mostrarTabela = false;
    this.beneficioSocial = new BeneficioSocial()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.filtro.elm && this.filtro.elm.id) {
      this.beneficioSocialService.getById(this.filtro.elm.id).subscribe((beneficioSocial: BeneficioSocial) => {
        if(!beneficioSocial){
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        }else {
          this.dataSource.data = [beneficioSocial];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }
  }


  atualizar(beneficioSocial: BeneficioSocial) {
    this.router.navigate(['/beneficiossociais/cadastrar'], { queryParams: { id: beneficioSocial.id } });
  }

  deletar(beneficioSocial: BeneficioSocial) {
    this.chamaCaixaDialogo(beneficioSocial);
  }

  chamaCaixaDialogo(beneficioSocial: BeneficioSocial) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.beneficioSocialService.excluir(beneficioSocial.id).subscribe(() => {
          this.beneficioSocial.id = null;
          this.consultar();
        })
      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.beneficioSocialService.getAll().subscribe((listaBeneficioSocial: BeneficioSocial[]) => {
      this.listaBeneficioSocial = listaBeneficioSocial;
      this.dataSource.data = listaBeneficioSocial ? listaBeneficioSocial : [];
      this.verificaMostrarTabela(listaBeneficioSocial);
    })
  }
  verificaMostrarTabela(listaBeneficioSocial: BeneficioSocial[]) {
    if(!listaBeneficioSocial ||listaBeneficioSocial.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum cadastro."
    }else{
      this.mostrarTabela = true;
    }
  }

  private carregarCombos() {
    this.beneficioSocialService.getAllByCombo().subscribe((listaCombo: BeneficioSocial[]) => {
      this.listaCombo = listaCombo;
      this.listaCombo.sort((a,b) => {
        if (a.nome > b.nome) {return 1;}
        if (a.nome < b.nome) {return -1;}
        return 0;
      });
    })
  }
}
