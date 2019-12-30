import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { FaltasFuncionario } from 'src/app/core/faltas-funcionario';
import { Funcionario } from 'src/app/core/funcionario';
import { FaltasFuncionarioService } from 'src/app/services/faltas-funcionario/faltas-funcionario.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { ToastService } from 'src/app/services/toast/toast.service';
@Component({
  selector: 'app-cadastrar-faltas-funcionario',
  templateUrl: './cadastrar-faltas-funcionario.component.html',
  styleUrls: ['./cadastrar-faltas-funcionario.component.css']
})
export class CadastrarFaltasFuncionarioComponent implements OnInit {

  funcionarios: Funcionario[];
  faltasFuncionario: FaltasFuncionario;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private faltasFuncionarioService: FaltasFuncionarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {
  }


  ngOnInit() {
    this.inicializarObjetos();

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    this.funcionarioService.getAll().subscribe((funcionarios: Funcionario[]) => {
      this.funcionarios = funcionarios;
    });

    let idFaltaFuncionario: number;
    idFaltaFuncionario = this.activatedRoute.snapshot.queryParams.idFaltaFuncionario ? this.activatedRoute.snapshot.queryParams.idFaltaFuncionario : null;
    if (idFaltaFuncionario) {
      this.isAtualizar = true;
      this.faltasFuncionarioService.getById(idFaltaFuncionario).subscribe((faltasFuncionario: FaltasFuncionario) => {
        this.faltasFuncionario = faltasFuncionario;
      });
    }

  }

  inicializarObjetos() {
    this.faltasFuncionario = new FaltasFuncionario();
    this.faltasFuncionario.funcionarioFaltou = new Funcionario();
    this.faltasFuncionario.funcionarioCadastrouFalta = new Funcionario();
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.faltasFuncionarioService.cadastrar(this.faltasFuncionario).subscribe(() => {
      this.router.navigate(['faltasfuncionario']);
      this.toastService.showSucesso("Falta cadastrada com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['faltasfuncionario']);
  }

  getNomeBotao() {
    return this.isAtualizar ? 'Atualizar' : 'Cadastrar';
  }

  atualizar() {
    this.faltasFuncionarioService.alterar(this.faltasFuncionario).subscribe(() => {
      this.router.navigate(['faltasfuncionario']);
      this.toastService.showSucesso("Falta atualizada com sucesso");
    });

  }

  mostrarDadosFuncionarioQueFaltou(idFuncionario: number) {
    this.faltasFuncionario.funcionarioFaltou = _.cloneDeep(_.find(this.funcionarios, (f: Funcionario) => f.id === idFuncionario));
  }

  mostrarDadosFuncionario(idFuncionario: number) {
    this.faltasFuncionario.funcionarioCadastrouFalta = _.cloneDeep(_.find(this.funcionarios, (f: Funcionario) => f.id === idFuncionario));
  }

}
