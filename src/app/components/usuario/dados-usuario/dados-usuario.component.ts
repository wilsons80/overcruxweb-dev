import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { UsuarioSistema } from 'src/app/core/usuario-sistema';

@Component({
  selector: 'dados-usuario',
  templateUrl: './dados-usuario.component.html',
  styleUrls: ['./dados-usuario.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DadosUsuarioComponent implements OnInit {

  @Input() usuarioSistema: UsuarioSistema;
  @Input() isAtualizar: boolean;

  hide = true;

  constructor() {

  }

  ngOnInit() {
  }

}
