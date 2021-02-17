import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/core/atividade';
import { Acesso } from 'src/app/core/acesso';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Acoes } from './../../../core/acoes';
import { AcoesAtividadeService } from './../../../services/acoes-atividade/acoes-atividade.service';
import * as _ from 'lodash';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { Funcionario } from 'src/app/core/funcionario';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';

@Component({
  selector: 'app-cadastrar-acoes-atividade',
  templateUrl: './cadastrar-acoes-atividade.component.html',
  styleUrls: ['./cadastrar-acoes-atividade.component.css']
})
export class CadastrarAcoesAtividadeComponent implements OnInit {

  acoes: Acoes = new Acoes();

  carregarPerfil: CarregarPerfil;
  perfilAcesso: Acesso = new Acesso();
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;


  constructor(
    private acoesAtividadeService: AcoesAtividadeService,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private drc: ChangeDetectorRef,
    private toolbarPrincipalService: ToolbarPrincipalService
  ) {
    this.acoes.oficina = new Atividade();
    this.carregarPerfil = new CarregarPerfil();
  }

  ngAfterContentChecked(): void {
    this.drc.detectChanges();
  }

  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    this.acoes.funcionarioAprovaAcao = new Funcionario();
    this.acoes.funcionarioAprovaAcao.pessoasFisica = new PessoaFisica();

    this.acoes.funcionarioExecutaAcao = new Funcionario();
    this.acoes.funcionarioExecutaAcao.pessoasFisica = new PessoaFisica();

    this.acoes.funcionarioPlanejamentoAcao = new Funcionario();
    this.acoes.funcionarioPlanejamentoAcao.pessoasFisica = new PessoaFisica();

    const codigoacao = this.activatedRoute.snapshot.queryParams.codigoacao ? this.activatedRoute.snapshot.queryParams.codigoacao : null;
    if (codigoacao) {
      this.isAtualizar = true;
      this.acoesAtividadeService.getById(codigoacao)
      .subscribe((acoes: Acoes) => {
        this.acoes = acoes;

        if(this.acoes.dataAprovaAcao) {
          this.mostrarBotaoAtualizar = false;
        }

        if(!this.acoes.funcionarioPlanejamentoAcao.pessoasFisica) {
          this.acoes.funcionarioPlanejamentoAcao.pessoasFisica = new PessoaFisica();
        }

        if(!this.acoes.funcionarioAprovaAcao && !this.acoes.funcionarioAprovaAcao.pessoasFisica) {
          this.acoes.funcionarioAprovaAcao = new Funcionario();
          this.acoes.funcionarioAprovaAcao.pessoasFisica = new PessoaFisica();
        }

        this.funcionarioService.getByPessoaFisica(this.toolbarPrincipalService.idPessoaFisica)
        .subscribe((funcionario: Funcionario) => {
          if(funcionario && funcionario.id) {
            this.acoes.funcionarioPlanejamentoAcao = funcionario;
          }
        });

      });
    }

  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    if (!this.validarDatas() ) { return; }

    this.acoesAtividadeService.cadastrar(this.acoes).subscribe(() => {
      this.router.navigate(['acoesoficinas']);
      this.toastService.showSucesso('Ações atividade cadastrada com sucesso');
    });
  }



  limpar() {
    this.acoes = new Acoes();
    this.acoes.oficina = new Atividade();

    this.acoes.funcionarioPlanejamentoAcao = new Funcionario();
    this.acoes.funcionarioAprovaAcao = new Funcionario();
    this.acoes.funcionarioExecutaAcao = new Funcionario();
  
    this.acoes.materiaisAcao =  [];
  }

  cancelar() {
    this.router.navigate(['acoesoficinas']);
  }


  atualizar() {
    if (!this.validarDatas() ) { return; }

    if(this.acoes.materiaisAcao) {
      const temQuantidadeInvalida = this.acoes.materiaisAcao.find(m => !m.quantidadeMaterial || m.quantidadeMaterial === 0);
      if(temQuantidadeInvalida) {
        this.toastService.showSucesso('Existem materiais com quantidade não informada ou com valor zero(0)');
        return;
      }


      const materiaisTemp = this.acoes.materiaisAcao.map(m => m.material.nome);
      const findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
      const jaExiste = findDuplicates(materiaisTemp);
      if(jaExiste && jaExiste.length) {
        this.toastService.showAlerta('Existem materiais duplicados na oficina.');
        return;
      }
    }

    this.acoesAtividadeService.alterar(this.acoes).subscribe(() => {
      this.router.navigate(['acoesoficinas']);
      this.toastService.showSucesso('Ações atividade atualizada com sucesso');
    });
  }

  private getValorByDate(valor) {
    if(valor === null || valor === undefined) return null;

    if(valor && valor instanceof Date) {
      const data = valor.toLocaleDateString().split('/');
      return new Date(data[2]+'-'+data[1]+'-'+data[0]);
    }

    if(valor && !(valor instanceof Date)) {
      const dataString = new Date(valor).toLocaleDateString();
      const data = dataString.split('/');
      return new Date(data[2]+'-'+data[1]+'-'+data[0]);
    }
  }

  validarDatas(): boolean {
    const dataInicioAtividade     = this.getValorByDate(this.acoes.oficina.dataInicio);
    const dataFimAtividade        = this.getValorByDate(this.acoes.oficina.dataFim);

    const dataIncioMatricula      = this.getValorByDate(this.acoes.dataInicio);
    const dataFimMatricula        = this.getValorByDate(this.acoes.dataFim);

    if (dataIncioMatricula && dataIncioMatricula.getTime() < dataInicioAtividade.getTime()) {
      this.toastService.showAlerta('A data de início informada não pode ser menor que a data de início da atividade selecionada.');
      return false;
    }

    if (dataFimAtividade) {
      if (dataIncioMatricula && dataIncioMatricula.getTime() > dataFimAtividade.getTime()) {
        this.toastService.showAlerta('A data de início informada não pode ser menor que a data de início da atividade selecionada.');
        return false;
      }
    }

    if (dataFimAtividade && dataFimMatricula &&
      dataFimMatricula.getTime() > dataFimAtividade.getTime()) {
      this.toastService.showAlerta('A data de fim informada não pode ser maior que a data de fim da atividade selecionada.');
      return false;
    }

    if (dataFimMatricula &&
      dataFimMatricula.getTime() < dataInicioAtividade.getTime()) {
      this.toastService.showAlerta('A data de fim informada não pode ser menor que a data de início da atividade selecionada.');
      return false;
    }

    if (dataFimMatricula && dataIncioMatricula &&
      dataFimMatricula.getTime() < dataIncioMatricula.getTime()) {
      this.toastService.showAlerta('A data fim não pode ser menor que a data de inicio.');
      return false;
    }

    return true;
  }


}
