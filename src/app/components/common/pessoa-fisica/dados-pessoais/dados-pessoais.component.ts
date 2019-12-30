import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { CondicoesMoradia } from 'src/app/core/condicoes-moradia';
import { PessoaFisica } from './../../../../core/pessoa-fisica';
import { CondicoesMoradiaService } from './../../../../services/condicoes-moradia/condicoes-moradia.service';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';

@Component({
  selector:  'dados-pessoais',
  templateUrl:  './dados-pessoais.component.html',
  styleUrls:  ['./dados-pessoais.component.css'],
  viewProviders:  [{ provide:  ControlContainer, useExisting:  NgForm }]
})
export class DadosPessoaisComponent implements OnInit {

  @Input() pessoaFisica: PessoaFisica;

  public maskCep     = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public maskPhone   = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCelular = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  ufs: any[] =[
    {nome:  'DF'}
  ]

  estadoCivil: any[] =[
    {tipo:  'SOLTEIRO'},
    {tipo:  'CASADO'},
    {tipo:  'UNIÃO ESTÁVEL'},
    {tipo:  'DIVORCIADO'},
    {tipo:  'VIÚVO'}
  ]
  
  racas: String[] =['AMARELO', 'BRANCO','INDÍGENA','NEGRO','PARDO']
  
  tipoSanguineo: String[] =['A+', 'A-','B+','AB+','AB-', 'O+', 'O-'];

  sexo: any[] =[
    {sigla:  'M', descricao:  'MASCULINO'},
    {sigla:  'F', descricao:  'FEMININO'}
  ]

  sim_nao: any[] = [
    {tipo: 'Sim', flag: 'S'},
    {tipo: 'Não', flag: 'N'}
  ];  

  condicoesMoradia: CondicoesMoradia[];

  tipoEscola: any[] = [
    {id:  'P', tipo:  'PÚBLICO'},
    {id:  'R', tipo:  'PRIVADO'},
  ];

  nivelEscolaridade: any[] =[
    { id: 'C' , tipo: 'COMPLETO'},
    { id: 'I' , tipo: 'CURSANDO'},
  ]


  constructor(
    private condicoesMoradiaService: CondicoesMoradiaService,
    private enderecoService: EnderecoService
  ) { }

  ngOnInit() {
    this.condicoesMoradiaService.getAll().subscribe((condicoesMoradia: CondicoesMoradia[])=> {
      this.condicoesMoradia = condicoesMoradia;
    });

    this.enderecoService.getAllEstados().subscribe((ufs: any)=> {
      this.ufs = ufs;
    });
  }

  fileChangeEvent(event:  any):  void {
    this.pessoaFisica.foto = event.target.files[0];
    this.pessoaFisica.isFotoChanged = true;
    this.readThis(event.target);
  }

  getBackground(){
    if(this.pessoaFisica && this.pessoaFisica.urlFoto){
      return `url(${this.pessoaFisica.urlFoto})`
    }
  }

  readThis(inputValue:  any):  void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.pessoaFisica.urlFoto = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
}
