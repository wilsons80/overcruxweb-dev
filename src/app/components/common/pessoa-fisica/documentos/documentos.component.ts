import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';

@Component({
  selector: 'documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DocumentosComponent implements OnInit {

  @Input() pessoaFisica: PessoaFisica;

  public mascaraCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,];
  public mascaraNIS = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, '-', /\d/];
    
  ufs: any[] = [
    {nome: 'DF'}
  ]

  constructor(
    private enderecoService:EnderecoService
  ) { }

  ngOnInit() {
    this.enderecoService.getAllEstados().subscribe((ufs:any)=> {
      this.ufs = ufs;
    });
  }

}
