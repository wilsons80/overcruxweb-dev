import { Component, OnInit } from '@angular/core';
import { TipoEmpresa } from 'src/app/core/tipo-empresa';

@Component({
  selector: 'cadastrar-fornecedoras',
  templateUrl: './cadastrar-fornecedoras.component.html',
  styleUrls: ['./cadastrar-fornecedoras.component.css']
})
export class CadastrarFornecedorasComponent implements OnInit {

  constructor() { }

  tiposEmpresa: any [] = [
    {tipo: TipoEmpresa.FORNECEDOR, descricao: 'FORNECEDOR'}, //F
    {tipo: TipoEmpresa.PARCEIRAFORNECEDOR, descricao: 'PARCEIRA E FORNECEDOR'},//R
    {tipo: TipoEmpresa.PARCEIRACLIENTEFORNECEDOR, descricao: 'PARCEIRA,CLIENTE E FORNECEDOR'},//e
    {tipo: TipoEmpresa.FORNECEDORCLIENTE, descricao: 'FORNECEDOR E CLIENTE'}, //N
  ]

  
  ngOnInit(): void {
  }

}
