import { Estoques } from './../../../core/estoques';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToastService } from 'src/app/services/toast/toast.service';
import { Material } from 'src/app/core/material';
import { Programa } from 'src/app/core/programa';
import { Projeto } from 'src/app/core/projeto';

@Component({
  selector: 'estoque-dialog',
  templateUrl: './estoque-dialog.component.html',
  styleUrls: ['./estoque-dialog.component.css']
})
export class EstoqueDialogComponent implements OnInit {

  estoque: Estoques;

  constructor(private toastService: ToastService,
              private dialogRef: MatDialogRef<EstoqueDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
      this.estoque = data.estoque;
  }

  ngOnInit() {
    if(!this.estoque) {
      this.estoque = new Estoques();
    }
    if(!this.estoque.material) {
      this.estoque.material = new Material();
    }
    if(!this.estoque.programa) {
      this.estoque.programa = new Programa();
    }
    if(!this.estoque.projeto) {
      this.estoque.projeto = new Projeto();
    }


  }

  cancelar() {
    this.dialogRef.close();
  }


}
