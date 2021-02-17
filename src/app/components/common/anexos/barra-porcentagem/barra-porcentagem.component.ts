import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'barra-porcentagem',
  templateUrl: './barra-porcentagem.component.html',
  styleUrls: ['./barra-porcentagem.component.css']
})
export class BarraPorcentagemComponent implements OnChanges {

  @Input() parcial;
  @Input() total;

  largura: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['parcial']) {
      this.largura = changes['parcial'].currentValue / this.total * 100;
      this.largura = this.largura + '%';
    }
  }
}
