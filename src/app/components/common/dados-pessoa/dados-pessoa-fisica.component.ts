import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { ArquivoPessoaFisicaService } from 'src/app/services/arquivo-pessoa-fisica/arquivo-pessoa-fisica.service';
import { FileUtils } from 'src/app/utils/file-utils';


@Component({
  selector: 'dados-pessoa-fisica',
  templateUrl: './dados-pessoa-fisica.component.html',
  styleUrls: ['./dados-pessoa-fisica.component.css']
})
export class DadosPessoaFisicaComponent implements OnInit {

  @Input() pessoaFisica: PessoaFisica;

  constructor(private arquivoPessoaFisicaService: ArquivoPessoaFisicaService,
    private fileUtils: FileUtils) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pessoaFisica']) {
      this.carregarDadosAluno();
    }
  }

  getBackground() {
    if (this.pessoaFisica && this.pessoaFisica.urlFoto) {
      return `url(${this.pessoaFisica.urlFoto})`;
    }
  }

  carregarDadosAluno() {
    if (this.pessoaFisica && this.pessoaFisica.id) {
      this.arquivoPessoaFisicaService.get(this.pessoaFisica.id).subscribe((foto: any) => {
        this.pessoaFisica.foto = foto;
        foto = this.fileUtils.convertBufferArrayToBase64(foto);
        this.pessoaFisica.urlFoto = foto.changingThisBreaksApplicationSecurity;
      });
    }
  }

}
