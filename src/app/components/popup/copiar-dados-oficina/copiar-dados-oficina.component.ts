import { Turmas } from './../../../core/turmas';
import { Atividade } from 'src/app/core/atividade';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'copiar-dados-oficina',
  template: '<div fxLayout="row" fxLayoutAlign="end start" fxLayoutGap="16px" fxFlexFill><button  mat-button (click)="copiar()"  color="primary"matTooltip="Importar dados de uma oficina já cadastrada"><mat-icon>save_alt</mat-icon>Importar oficina</button></div>'
})
export class CopiarDadosOficinaComponent {

  @Input() oficina: Atividade;
  @Input() turmas: Turmas[];

  constructor(private dialog: MatDialog) {}

  copiar() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {oficina: this.oficina, turmas: this.turmas};
    this.dialog.open(CopiarDadosOficinaDialogComponent, dialogConfig);
  }
}

@Component({
  selector: 'copiar-dados-oficina-dialog',
  templateUrl: './copiar-dados-oficina.component.html',
  styleUrls: ['./copiar-dados-oficina.component.css']
})
export class CopiarDadosOficinaDialogComponent implements OnInit {

  turmas: Turmas[];
  oficinas: Atividade[];

  turmaSelecionada: Turmas = new Turmas();
  oficinaSelecionada: Atividade = new Atividade();

  oficina: Atividade = new Atividade();

  constructor(private toastService: ToastService,
              private dialogRef: MatDialogRef<CopiarDadosOficinaDialogComponent>,
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
