import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'extrato-conta-bancaria',
  templateUrl: './extrato-conta-bancaria.component.html',
  styleUrls: ['./extrato-conta-bancaria.component.css']
})
export class ExtratoContaBancariaComponent implements OnInit {

  @Input() extrato;

  constructor() { }

  ngOnInit(): void {
  }

}
