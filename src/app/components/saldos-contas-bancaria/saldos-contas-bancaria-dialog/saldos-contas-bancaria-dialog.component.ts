import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Extrato } from 'src/app/core/extrato';


@Component({
  selector: 'saldos-contas-bancaria-dialog',
  templateUrl: './saldos-contas-bancaria-dialog.component.html',
  styleUrls: ['./saldos-contas-bancaria-dialog.component.css']
})
export class SaldosContasBancariaDialogComponent implements OnInit {

  extrato: Extrato;

  constructor(private dialogRef: MatDialogRef<SaldosContasBancariaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
      this.extrato = data.extrato;
  }

  ngOnInit() {

    if(!this.extrato) {
      this.extrato = new Extrato();
    }

  }

  cancelar() {
    this.dialogRef.close();
  }
}