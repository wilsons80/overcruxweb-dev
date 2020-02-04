import { Material } from 'src/app/core/material';
import { CotacoesMateriais } from './../../core/cotacoes-materiais';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'cotacoes-materiais',
  templateUrl: './cotacoes-materiais.component.html',
  styleUrls: ['./cotacoes-materiais.component.css']
})
export class CotacoesMateriaisComponent implements OnInit {

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
