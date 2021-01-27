import { Component, OnInit } from '@angular/core';
import { TipoEmpresa } from 'src/app/core/tipo-empresa';

@Component({
  selector: 'cadastrar-clientes',
  templateUrl: './cadastrar-clientes.component.html',
  styleUrls: ['./cadastrar-clientes.component.css']
})
export class CadastrarClientesComponent implements OnInit {

  constructor() { }
  
  tiposEmpresa: any [] = [
    {tipo: TipoEmpresa.CLIENTE, descricao: 'CLIENTE'}, //C
    {tipo: TipoEmpresa.PARCEIRACLIENTEFORNECEDOR, descricao: 'PARCEIRA, CLIENTE e FORNECEDOR'},//E
    {tipo: TipoEmpresa.PARCEIRACLIENTE, descricao: 'PARCEIRA e CLIENTE'},//L
    {tipo: TipoEmpresa.FORNECEDORCLIENTE, descricao: 'FORNECEDOR E CLIENTE'}, //N
  ]
  ngOnInit(): void {
  }

}
