import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cadastrar-movimentacoes-materiais',
  templateUrl: './cadastrar-movimentacoes-materiais.component.html',
  styleUrls: ['./cadastrar-movimentacoes-materiais.component.css']
})
export class CadastrarMovimentacoesMateriaisComponent implements OnInit {

  materiais = [];
  programas = [];
  projetos = [];
  empresas= [];
  funcionarios= [];

  isAtualizar = false;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = false;

  tiposMovimentacoes = [
    {id:"E", descricao: "ENTRADA"},
    {id:"S", descricao: "SAÍDA"},
    {id:"A", descricao: "ACERTO ESTOQUE"}
  ]

  constructor() { }

  ngOnInit() {
  }


    cadastrar(){}
  atualizar(){}
  limpar(){}
  cancelar(){}
  mostrarBotaoLimpar(){return true;}
}
