import { TipoOcorrenciaAluno } from 'src/app/core/tipo-ocorrencia-aluno';
import { Aluno } from './../../../core/aluno';
import { AlunoService } from './../../../services/aluno/aluno.service';
import { FuncionarioService } from 'src/app/services/funcionario/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { OcorrenciaAluno } from 'src/app/core/ocorrencia-aluno';
import { Funcionario } from 'src/app/core/funcionario';
import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { TipoOcorrenciaAlunoService } from 'src/app/services/tipo-ocorrencia-aluno/tipo-ocorrencia-aluno.service';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { OcorrenciaAlunoService } from 'src/app/services/ocorrencia-aluno/ocorrencia-aluno.service';
import * as _ from 'lodash';
import { ComboAluno } from 'src/app/core/combo-aluno';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { ComboFuncionario } from 'src/app/core/combo-funcionario';


export class Filter{
	aluno: ComboAluno;
	funcionario: ComboFuncionario;
}


@Component({
  selector: 'cadastrar-ocorrencia-aluno',
  templateUrl: './cadastrar-ocorrencia-aluno.component.html',
  styleUrls: ['./cadastrar-ocorrencia-aluno.component.css']
})
export class CadastrarOcorrenciaAlunoComponent implements OnInit {

  filtro: Filter;
  
  listaDeTipoOcorrencia: TipoOcorrenciaAluno[];
  

  ocorrenciaAluno: OcorrenciaAluno = new OcorrenciaAluno();

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;
  
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  constructor(private toolbarPrincipalService: ToolbarPrincipalService,
              private funcionarioService: FuncionarioService,
              private tipoOcorrenciaService: TipoOcorrenciaAlunoService,
              private ocorrenciaService: OcorrenciaAlunoService,
              private alunoService: AlunoService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastService: ToastService) { 
    this.carregarPerfil = new CarregarPerfil();                
  }


  ngOnInit() {
    this.limpar();
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.ocorrenciaAluno.aluno = new Aluno();
    this.ocorrenciaAluno.funcionario = new Funcionario();
    this.ocorrenciaAluno.tipoOcorrenciaAluno = new TipoOcorrenciaAluno();


    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }


    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.ocorrenciaService.getById(id).subscribe((ocorrenciaAluno: OcorrenciaAluno) => {
        this.ocorrenciaAluno = ocorrenciaAluno;
        this.filtro.aluno.id       = this.ocorrenciaAluno.aluno.id;
        this.filtro.funcionario.id = this.ocorrenciaAluno.funcionario.id;
      });
    } 
    

    this.tipoOcorrenciaService.getAll().subscribe( (tipos: TipoOcorrenciaAluno[]) => {
      this.listaDeTipoOcorrencia = tipos;
    });


  }



  mostrarBotaoLimpar(){
    if (this.isAtualizar)  { return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }


  cadastrar() {
    if (!this.isDataCienciaValida() ) {
      this.toastService.showAlerta('A data de ciência não pode ser inferior a data da ocorrência.');
      return;
    }

    this.ocorrenciaService.cadastrar(this.ocorrenciaAluno).subscribe(() => {
      this.router.navigate(['ocorrenciaaluno']);
      this.toastService.showSucesso('Ocorrência cadastrada com sucesso!');
    });
  }

  limpar() {
    this.ocorrenciaAluno = new OcorrenciaAluno();
    this.filtro = new Filter();
    this.filtro.aluno = new ComboAluno();
    this.filtro.funcionario = new ComboFuncionario();
  }

  cancelar() {
    this.router.navigate(['ocorrenciaaluno']);
  }


  atualizar() {
    if (!this.isDataCienciaValida() ) {
      this.toastService.showAlerta('A data de ciência não pode ser inferior a data da ocorrência.');
      return;
    }

    this.ocorrenciaService.alterar(this.ocorrenciaAluno).subscribe(() => {
      this.router.navigate(['ocorrenciaaluno']);
      this.toastService.showSucesso('Ocorrência atualizada com sucesso.');
    });

  }

  mostrarDadosFuncionario(idFuncionario: number) {
    this.funcionarioService.getById(idFuncionario).subscribe((funcionario: Funcionario) => {
      this.ocorrenciaAluno.funcionario = funcionario;
    })
  }

  mostrarDadosAluno(idAluno: number) {
    this.alunoService.getById(idAluno).subscribe((aluno: Aluno) => {
      this.ocorrenciaAluno.aluno = aluno;
    });
  }

  isDataCienciaValida() {
    if (this.ocorrenciaAluno.dataCiencia 
        && 
        new Date(this.ocorrenciaAluno.dataCiencia).getTime() < new Date(this.ocorrenciaAluno.dataOcorrencia).getTime()) {
      return false;
    }
    return true;
  }



  onValorChangeAluno(registro: any) {
    this.filtro.aluno = registro;
    if(registro) {
      this.mostrarDadosAluno(registro.id);
    }
  }

  onValorChangeFuncionario(registro: any) {
    this.filtro.aluno = registro;
    if(registro) {
      this.mostrarDadosFuncionario(registro.id);
    }
  }


}
