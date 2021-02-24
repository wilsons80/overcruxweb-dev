import { Turmas } from '../../../core/turmas';
import { Atividade } from 'src/app/core/atividade';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'copiar-dados-acao',
  template: '<div fxLayout="row" fxLayoutAlign="end start" fxLayoutGap="16px" fxFlexFill><button  mat-button (click)="copiar()"  color="primary"matTooltip="Importar dados de uma ação já cadastrada"><mat-icon>save_alt</mat-icon>Importar Ação</button></div>'
})
export class CopiarDadosAcaoComponent {

  @Input() oficina: Atividade;
  @Input() turmas: Turmas[];

  constructor(private dialog: MatDialog) {}

  copiar() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      oficina: this.oficina, 
      turmas: this.turmas
    };
    this.dialog.open(CopiarDadosAcaoDialogComponent, dialogConfig);
  }
}

@Component({
  selector: 'copiar-dados-acao-dialog',
  templateUrl: './copiar-dados-acao.component.html',
  styleUrls: ['./copiar-dados-acao.component.css']
})
export class CopiarDadosAcaoDialogComponent implements OnInit {

  turmas: Turmas[];
  oficinas: Atividade[];

  turmaSelecionada: Turmas = new Turmas();
  oficinaSelecionada: Atividade = new Atividade();

  oficina: Atividade = new Atividade();

  constructor(private toastService: ToastService,
              private dialogRef: MatDialogRef<CopiarDadosAcaoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
     this.oficina = data.oficina;
     this.turmas = data.turmas;
  }

  ngOnInit() {
  }

  limpar() {
    this.turmaSelecionada = new Turmas();
    this.oficinaSelecionada = new Atividade();
  }

  carregarOficinas(turma: Turmas) {
    this.oficinas = turma.oficinas;
  }

  cancelar() {
    this.dialogRef.close();
  }

  copiarOficina() {
    if (this.oficinaSelecionada) {
      this.oficinaSelecionada.id = null;
      Object.assign(this.oficina, this.oficinaSelecionada);
      this.toastService.showAlerta(`Dados da oficina copiado com sucesso`);
      this.dialogRef.close();
    } else {
      this.toastService.showAlerta(`Oficina não foi selecionada para copia, tente novamente.`);
      this.dialogRef.close();
    }
  }

}
