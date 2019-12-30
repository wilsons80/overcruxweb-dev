import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  pergunta: any;
  textoAuxiliar: any;
  textoConfirma: any;
  textoCancela: any;

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {
    if (data) {
      this.pergunta = data.pergunta;
      this.textoAuxiliar = data.textoAuxiliar;
      this.textoConfirma = data.textoConfirma;
      this.textoCancela = data.textoCancela;

      // Não permite fechar o Dialog clicando com 'esc' ou fora do Dialog
      dialogRef.disableClose = data.disableClose;
    }

  }

  ngOnInit() {
    if (!this.textoConfirma) {
      this.textoConfirma = 'Ok';
    }
    if (!this.textoCancela) {
      this.textoCancela = 'Cancelar';
    }
  }

  confirma() {
    this.dialogRef.close(true);
  }

  cancela() {
    this.dialogRef.close(false);
  }

}
