import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cadastrar-cotacoes-materiais',
  templateUrl: './cadastrar-cotacoes-materiais.component.html',
  styleUrls: ['./cadastrar-cotacoes-materiais.component.css']
})
export class CadastrarCotacoesMateriaisComponent implements OnInit {

  materiais =[];
  pedidos =[];
  empresas =[];

  isAtualizar = false;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = false;

  constructor() { }

  ngOnInit() {
  }


  cadastrar(){}
  atualizar(){}
  limpar(){}
  cancelar(){}
  mostrarBotaoLimpar(){return true;}


}
