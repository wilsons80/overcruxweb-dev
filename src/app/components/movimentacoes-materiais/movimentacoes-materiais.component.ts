import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/core/material';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'movimentacoes-materiais',
  templateUrl: './movimentacoes-materiais.component.html',
  styleUrls: ['./movimentacoes-materiais.component.css']
})
export class MovimentacoesMateriaisComponent implements OnInit {

  materiais=[]
  mostrarTabela= false;

  displayedColumns: string[] = ['DataAtendimento', 'Aluno', 'Diagnostico', 'acoes'];
  dataSource: MatTableDataSource<Material> = new MatTableDataSource();

  msg = "Nenhum material cadastrado."

  constructor() { }

  ngOnInit() {
  }


  consultar(){}
  limpar(){}
  deletar(element){}
  atualizar(element){}
}
