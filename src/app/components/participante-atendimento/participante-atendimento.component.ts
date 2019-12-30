import { Component, OnInit, ViewChild } from '@angular/core';
import { ParticipanteAtendimento } from 'src/app/core/participante-atendimento';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { PerfilAcesso } from 'src/app/core/perfil-acesso';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { ParticipantesAtendimentosService } from 'src/app/services/participantes-atendimentos/participantes-atendimentos.service';

@Component({
  selector: 'app-participante-atendimento',
  templateUrl: './participante-atendimento.component.html',
  styleUrls: ['./participante-atendimento.component.css']
})
export class ParticipanteAtendimentoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  participantesAtendimento: ParticipanteAtendimento[];
  mostrarTabela: boolean = false;
  participanteAtendimento: ParticipanteAtendimento = new ParticipanteAtendimento();
  msg: string;
  perfilAcesso: PerfilAcesso;

  displayedColumns: string[] = ['data','Atendimento', 'Familiares', 'Funcionario', 'acoes'];
  dataSource: MatTableDataSource<ParticipanteAtendimento> = new MatTableDataSource();

  constructor(
    private participantesAtendimentosService: ParticipantesAtendimentosService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    this.dataSource.paginator = this.paginator;
    this.getAll();
  }


  limpar() {
    this.mostrarTabela = false;
    this.participanteAtendimento = new ParticipanteAtendimento()
    this.dataSource.data = [];
  }

  consultar() {
    if (this.participanteAtendimento.id) {
      this.participantesAtendimentosService.getById(this.participanteAtendimento.id).subscribe((participanteAtendimento: ParticipanteAtendimento) => {
        if (!participanteAtendimento) {
          this.mostrarTabela = false
          this.msg = "Nenhum registro para a pesquisa selecionada"
        } else {
          this.dataSource.data = [participanteAtendimento];
          this.mostrarTabela = true;
        }
      })
    } else {
      this.getAll();
    }

  }


  atualizar(participanteAtendimento: ParticipanteAtendimento) {
    this.router.navigate(['/participanteatendimento/cadastrar'], { queryParams: { idParticipanteAtendimento: participanteAtendimento.id } });
  }

  deletar(participanteAtendimento: ParticipanteAtendimento) {
    this.chamaCaixaDialogo(participanteAtendimento);
  }

  chamaCaixaDialogo(participanteAtendimento: ParticipanteAtendimento) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      pergunta: `Certeza que deseja excluir o participante ?`,
      textoConfirma: 'SIM',
      textoCancela: 'NÃO'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(confirma => {
      if (confirma) {
        this.participantesAtendimentosService.excluir(participanteAtendimento.id).subscribe(() => {
          this.participanteAtendimento.id = null;
          this.consultar();
        })

      } else {
        dialogRef.close();
      }
    }
    );
  }

  getAll() {
    this.participantesAtendimentosService.getAll().subscribe((participantesAtendimento: ParticipanteAtendimento[]) => {
      this.participantesAtendimento = participantesAtendimento;
      this.dataSource.data = participantesAtendimento ? participantesAtendimento : [];
      this.verificaMostrarTabela(participantesAtendimento);
    })
  }

  verificaMostrarTabela(participantesAtendimento: ParticipanteAtendimento[]) {
    if (!participantesAtendimento || participantesAtendimento.length == 0) {
      this.mostrarTabela = false;
      this.msg = "Nenhum participante cadastrado."
    } else {
      this.mostrarTabela = true;
    }
  }

}
