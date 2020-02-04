import { CategoriasContabeis } from './../../core/categorias-contabeis';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'categorias-contabeis',
  templateUrl: './categorias-contabeis.component.html',
  styleUrls: ['./categorias-contabeis.component.css']
})
export class CategoriasContabeisComponent implements OnInit {

  categorias=[]
  mostrarTabela= false;

  displayedColumns: string[] = ['DataAtendimento', 'Aluno', 'Diagnostico', 'acoes'];
  dataSource: MatTableDataSource<CategoriasContabeis> = new MatTableDataSource();

  msg = "Nenhuma categoria contábil cadastrada."
 
  constructor() { }

  ngOnInit() {
  }

  consultar(){}
  limpar(){}
  deletar(element){}
  atualizar(element){}

}
