import { Component, OnInit } from '@angular/core';
import { InformacoesBanco } from 'src/app/core/informacoes-banco';

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
  
  tipoContas = [
    {id:"C", nome:"Conta Corrente"},
    {id:"P", nome:"Poupança"}
  ];

  isAtualizar = false;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = false;

    cadastrar(){}
  atualizar(){}
  limpar(){}
  cancelar(){}
  mostrarBotaoLimpar(){return true;}
  

  constructor() { }

  ngOnInit() {
  }
  

}
