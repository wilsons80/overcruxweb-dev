import { Unidade } from 'src/app/core/unidade';
import { Component, Input, OnInit } from '@angular/core';
import { TipoUnidade } from 'src/app/core/tipo-unidade';
import { Instituicao } from 'src/app/core/instituicao';
import { InstituicaoService } from 'src/app/services/instituicao/instituicao.service';
import * as _ from 'lodash';

@Component({
  selector: 'dados-basicos-unidade',
  templateUrl: './dados-basicos-unidade.component.html',
  styleUrls: ['./dados-basicos-unidade.component.css']
})
export class DadosBasicosUnidadeComponent implements OnInit {

  @Input() unidade:Unidade;

  instituicoes: Instituicao[];

  public maskCep = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public maskCNJP = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public maskPhone   = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCelular = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  situacoesImovel: any[] = [
    { id: '1', tipo: 'P', descricao: 'PRÓPRIO' },
    { id: '2', tipo: 'C', descricao: 'CONCESSÃO' },
    { id: '3', tipo: 'L', descricao: 'LICENÇA PRA FUNCIONAMENTO' },
    { id: '4', tipo: 'O', descricao: 'OUTRO' }
  ]

  tiposUnidade: TipoUnidade = new TipoUnidade();

  constructor(
    private instituicaoService:InstituicaoService) { }

  ngOnInit(): void {
    this.instituicaoService.getInstituicoesComAcesso().subscribe((dados: Instituicao[]) => {
      this.instituicoes = dados;

      this.unidade.instituicao = dados[0];

    });

    
  }

  getBackground() {
    if (this.unidade && this.unidade.urlFoto) {
      return `url(${this.unidade.urlFoto})`
    }
  }

  fileChangeEvent(event: any): void {
    this.unidade.foto = event.target.files[0];
    this.unidade.isFotoChanged = true;
    this.readThis(event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.unidade.urlFoto = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

  carregarInstituicao(idInstituicao: number) {
    this.unidade.instituicao = _.cloneDeep(_.find(this.instituicoes, (d: Instituicao) => d.id === idInstituicao));
  }

}
