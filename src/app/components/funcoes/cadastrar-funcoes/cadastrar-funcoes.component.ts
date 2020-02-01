import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cadastrar-funcoes',
  templateUrl: './cadastrar-funcoes.component.html',
  styleUrls: ['./cadastrar-funcoes.component.css']
})
export class CadastrarFuncoesComponent implements OnInit {


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
