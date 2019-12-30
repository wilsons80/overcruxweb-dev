import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { tap } from 'rxjs/operators';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Dependentes } from 'src/app/core/dependentes';
import { Funcionario } from 'src/app/core/funcionario';
import { ToastService } from 'src/app/services/toast/toast.service';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { NgForm, ControlContainer } from '@angular/forms';
import { DependentesService } from 'src/app/services/dependentes/dependentes.service';

@Component({
  selector: 'cadastrar-dependentes',
  templateUrl: './cadastrar-dependentes.component.html',
  styleUrls: ['./cadastrar-dependentes.component.css'],
  viewProviders:  [{ provide:  ControlContainer, useExisting:  NgForm }]
})
export class CadastrarDependentesComponent implements OnInit {

  @Input() dependente: Dependentes = new Dependentes();
  @Input() funcionario: Funcionario;

  public mascaraCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/,];
  public mascaraNIS = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, '-', /\d/];
  public maskCep     = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public maskPhone   = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCelular = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  sim_nao: any[] = [
    {tipo: 'Sim', flag: 'S'},
    {tipo: 'Não', flag: 'N'}
  ];

  ufs: any[] = [
    {nome: 'DF'}
  ];

  sexo: any[] =[
    {sigla:  'M', descricao:  'MASCULINO'},
    {sigla:  'F', descricao:  'FEMININO'}
  ];

  mensagemDependente: string = null;
  outroResponsavelPeloDependente: Funcionario = null;

  constructor(private toastService: ToastService,
              private dependentesService: DependentesService,
              private funcionarioService: FuncionarioService,
              private enderecoService: EnderecoService) {
  }

  ngOnInit() {
    this.initObjetos();

    this.enderecoService.getAllEstados().subscribe((ufs: any[]) => {
      this.ufs = ufs;
    });

  }

   adicionar() {
    this.dependente.idFuncionario = this.funcionario.id;
    this.funcionario.dependentes.push(this.dependente);
    this.initObjetos();
  }

  initObjetos() {
    this.dependente = new Dependentes();
    this.dependente.pessoaFisica = new PessoaFisica();
    this.mensagemDependente = null;
  }

  carregarDependente(dependente: Dependentes) {
    this.dependente = dependente;
  }

  habilitaBotao(formulario): boolean {
    return Object.keys(formulario.controls).length && true;
    /*
            &&
           (!!formulario.controls.nome.value &&
           !!formulario.controls.cpf.value &&

           !!formulario.controls.celular.value);
           */
  }

  getApenasNumeros(valor) {
    return valor.replace(/\D/g, '');
  }

  verificarDependente(cpf) {
    this.mensagemDependente = null;

    if (cpf) {
      cpf = this.getApenasNumeros(cpf);

      this.dependentesService.getAllByCpf(cpf).subscribe((dependente: Dependentes) => {
        if (dependente && this.funcionario.pessoasFisica.cpf !== dependente.pessoaFisica.cpf) {

          this.funcionarioService.getById(dependente.idFuncionario).subscribe((funcionario: Funcionario) => {
            this.outroResponsavelPeloDependente = funcionario;
            this.dependente.pessoaFisica.cpf = null;

            this.mensagemDependente = `O colaborador(a) '${funcionario.pessoasFisica.nome}' já é responsável por este dependente: (${cpf}).`; 
          });

        } else {
          this.outroResponsavelPeloDependente = null;
        }
      });
    }
  }


}
