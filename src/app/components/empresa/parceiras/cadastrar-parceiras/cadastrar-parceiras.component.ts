import { Component, OnInit } from '@angular/core';
import { TipoEmpresa } from 'src/app/core/tipo-empresa';

@Component({
  selector: 'cadastrar-parceiras',
  templateUrl: './cadastrar-parceiras.component.html',
  styleUrls: ['./cadastrar-parceiras.component.css']
})
export class CadastrarParceirasComponent implements OnInit {

  constructor() { }


  tiposEmpresa: any [] = [
    {tipo: TipoEmpresa.PARCEIRA, descricao: 'PARCEIRA'}, //P
    {tipo: TipoEmpresa.PARCEIRAFORNECEDOR, descricao: 'PARCEIRA e FORNECEDOR'}, //R
    {tipo: TipoEmpresa.PARCEIRACLIENTEFORNECEDOR, descricao: 'PARCEIRA, CLIENTE e FORNECEDOR'},//E
    {tipo: TipoEmpresa.PARCEIRACLIENTE, descricao: 'PARCEIRA e CLIENTE'},//L
  ]

  ngOnInit(): void {
  }

}
