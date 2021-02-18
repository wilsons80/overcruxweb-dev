import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Aluno } from 'src/app/core/aluno';
import { ArquivoPessoaFisicaService } from 'src/app/services/arquivo-pessoa-fisica/arquivo-pessoa-fisica.service';
import { FileUtils } from 'src/app/utils/file-utils';


@Component({
  selector: 'dados-aluno',
  templateUrl: './dados-aluno.component.html',
  styleUrls: ['./dados-aluno.component.css']
})
export class DadosAlunoComponent implements OnInit {

  @Input() aluno: Aluno;

  constructor(private arquivoPessoaFisicaService: ArquivoPessoaFisicaService,
              private fileUtils: FileUtils) { }

  ngOnInit() {}

  ngOnChanges(changes:SimpleChanges): void {
   if(changes['aluno']){
    this.carregarDadosAluno();
   }
  }

  getBackground() {
    if (this.aluno.pessoaFisica && this.aluno.pessoaFisica.urlFoto) {
      return `url(${this.aluno.pessoaFisica.urlFoto})`;
    }
  }

  carregarDadosAluno() {
    if (this.aluno && this.aluno.pessoaFisica && this.aluno.pessoaFisica.id) {
      this.arquivoPessoaFisicaService.get(this.aluno.pessoaFisica.id).subscribe((foto: any) => {
        this.aluno.pessoaFisica.foto = foto;
        foto = this.fileUtils.convertBufferArrayToBase64(foto);
        this.aluno.pessoaFisica.urlFoto = foto ? foto.changingThisBreaksApplicationSecurity : '';
      });
    }
  }

}
