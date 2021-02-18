import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Funcionario } from 'src/app/core/funcionario';
import { ArquivoPessoaFisicaService } from 'src/app/services/arquivo-pessoa-fisica/arquivo-pessoa-fisica.service';
import { FileUtils } from 'src/app/utils/file-utils';
import { TipoFuncionario } from 'src/app/core/tipo-funcionario';



@Component({
  selector: 'dados-funcionario',
  templateUrl: './dados-funcionario.component.html',
  styleUrls: ['./dados-funcionario.component.css']
})
export class DadosFuncionarioComponent implements OnInit {

  @Input() funcionario: Funcionario;
  tipoFuncionario: TipoFuncionario = new TipoFuncionario();
  descricaoTipoFuncionario = '';

  constructor(private arquivoPessoaFisicaService: ArquivoPessoaFisicaService,
              private fileUtils: FileUtils) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['funcionario']) {
      this.carregarDadosFuncionario();
    }
  }

  getBackground() {
    if (this.funcionario.pessoasFisica && this.funcionario.pessoasFisica.urlFoto) {
      return `url(${this.funcionario.pessoasFisica.urlFoto})`;
    }
  }

  carregarDadosFuncionario() {
    if (this.funcionario && this.funcionario.pessoasFisica && this.funcionario.pessoasFisica.id) {
      this.arquivoPessoaFisicaService.get(this.funcionario.pessoasFisica.id).subscribe((foto: any) => {
        this.funcionario.pessoasFisica.foto = foto;
        foto = this.fileUtils.convertBufferArrayToBase64(foto);
        this.funcionario.pessoasFisica.urlFoto = foto ? foto.changingThisBreaksApplicationSecurity : '';
        this.descricaoTipoFuncionario = this.tipoFuncionario.getDescricao(this.funcionario.cargo.tipoCargo);
      });
    }
  }

}
