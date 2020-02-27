import { SaldosContasBancaria } from 'src/app/core/saldos-contas-bancaria';
import { Component, OnInit, Inject } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'saldos-contas-bancaria-dialog',
  templateUrl: './saldos-contas-bancaria-dialog.component.html',
  styleUrls: ['./saldos-contas-bancaria-dialog.component.css']
})
export class SaldosContasBancariaDialogComponent implements OnInit {

  saldoBancario: SaldosContasBancaria;

  constructor(private toastService: ToastService,
              private dialogRef: MatDialogRef<SaldosContasBancariaDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
      this.saldoBancario = data.saldoContaBancaria;
  }

  ngOnInit() {

    if(!this.saldoBancario) {
      this.saldoBancario = new SaldosContasBancaria();
    }

  }

  cancelar() {
    this.dialogRef.close();
  }
}