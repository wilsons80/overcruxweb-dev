import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cadastrar-categorias-contabeis',
  templateUrl: './cadastrar-categorias-contabeis.component.html',
  styleUrls: ['./cadastrar-categorias-contabeis.component.css']
})
export class CadastrarCategoriasContabeisComponent implements OnInit {

  categorias:any =[];

  tipos= [
    {id: "D", descricao:"DESPESA"},
    {id: "R", descricao:"RECEITA"},
  ]

  constructor() { }

  ngOnInit() {
  }

}
