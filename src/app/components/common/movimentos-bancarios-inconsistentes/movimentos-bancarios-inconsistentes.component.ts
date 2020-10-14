import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'movimentos-bancarios-inconsistentes',
  templateUrl: './movimentos-bancarios-inconsistentes.component.html',
  styleUrls: ['./movimentos-bancarios-inconsistentes.component.css']
})
export class MovimentosBancariosInconsistentesComponent implements OnInit {

  dados: any[];
  titulo: string = '';

  constructor(private dialogRef: MatDialogRef<MovimentosBancariosInconsistentesComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
      this.dados = data.dados;
      this.titulo = data.titulo;
  }

  ngOnInit() {
    if(!this.dados) {
      this.dados = [];      
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

}
