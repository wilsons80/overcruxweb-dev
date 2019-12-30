import { Component, OnInit, Input } from '@angular/core';
import { EntidadesSociais } from 'src/app/core/entidades-sociais';

@Component({
  selector: 'dados-entidade-social',
  templateUrl: './dados-entidade-social.component.html',
  styleUrls: ['./dados-entidade-social.component.css']
})
export class DadosEntidadeSocialComponent implements OnInit {

  @Input() entidadeSocial: EntidadesSociais;

  constructor() { }

  ngOnInit() {
  }

}
