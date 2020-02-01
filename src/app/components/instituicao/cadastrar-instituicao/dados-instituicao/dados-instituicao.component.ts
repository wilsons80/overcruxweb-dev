import { Instituicao } from 'src/app/core/instituicao';
import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'dados-instituicao',
  templateUrl: './dados-instituicao.component.html',
  styleUrls: ['./dados-instituicao.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DadosInstituicaoComponent implements OnInit {

  @Input() instituicao:Instituicao;

  constructor() { }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.instituicao.foto = event.target.files[0];
    this.instituicao.isFotoChanged = true;
    this.readThis(event.target);
  }

  getBackground() {
    if (this.instituicao && this.instituicao.urlFoto) {
      return `url(${this.instituicao.urlFoto})`;
    }
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.instituicao.urlFoto = myReader.result;
    }
    myReader.readAsDataURL(file);
  }


}
