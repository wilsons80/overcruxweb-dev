import { InformacoesBanco } from './../../../../../.history/src/app/core/informacoes-banco_20200205172350';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cadastrar-contas-bancarias',
  templateUrl: './cadastrar-contas-bancarias.component.html',
  styleUrls: ['./cadastrar-contas-bancarias.component.css']
})
export class CadastrarContasBancariasComponent implements OnInit {

  listaBancos:InformacoesBanco[] = [
    {numero:"001", nome:"Banco do Brasil"},
    {numero:"070", nome:"Banco de Brasília"}
  ];

  

  constructor() { }

  ngOnInit() {
  }
  

}
