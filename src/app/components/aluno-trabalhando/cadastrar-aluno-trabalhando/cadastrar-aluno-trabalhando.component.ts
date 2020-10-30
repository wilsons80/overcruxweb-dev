import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Aluno } from 'src/app/core/aluno';
import { AlunoTrabalhando } from 'src/app/core/aluno-trabalhando';
import { AlunoTrabalhandoService } from 'src/app/services/aluno-trabalhando/aluno-trabalhando.service';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import * as _ from 'lodash';
import { EmpresaService } from 'src/app/services/empresa/empresa.service';
import { Empresa } from 'src/app/core/empresa';
import { FilterAlunos } from 'src/app/core/filter-alunos';
import { ComboAluno } from 'src/app/core/combo-aluno';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';


@Component({
  selector: 'app-cadastrar-aluno-trabalhando',
  templateUrl: './cadastrar-aluno-trabalhando.component.html',
  styleUrls: ['./cadastrar-aluno-trabalhando.component.css']
})
export class CadastrarAlunoTrabalhandoComponent implements OnInit {

  filtro: FilterAlunos;
  comboAluno: ComboAluno[];

  alunos: Aluno[];
  alunoTrabalhando: AlunoTrabalhando = new AlunoTrabalhando();

  empresas: Empresa[];

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;

  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;


  constructor(
    private alunoService: AlunoService,
    private empresaService: EmpresaService,
    private alunoTrabalhandoService: AlunoTrabalhandoService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) {
    this.carregarPerfil = new CarregarPerfil();
  }


  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.filtro = new FilterAlunos();
    this.filtro.aluno = new ComboAluno();


    this.alunoTrabalhando.aluno = new Aluno();
    this.alunoTrabalhando.empresa = new Empresa();


    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    this.carregarCombos();


    this.empresaService.getAll().subscribe((empresas: Empresa[]) => {
      this.empresas = empresas;
    });


    let idAlunoTrabalhando: number;
    idAlunoTrabalhando = this.activatedRoute.snapshot.queryParams.idAlunoTrabalhando ? this.activatedRoute.snapshot.queryParams.idAlunoTrabalhando : null;
    if (idAlunoTrabalhando) {
      this.isAtualizar = true;
      this.alunoTrabalhandoService.getById(idAlunoTrabalhando).subscribe((alunoTrabalhando: AlunoTrabalhando) => {
        this.alunoTrabalhando = alunoTrabalhando
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
    this.alunoTrabalhandoService.cadastrar(this.alunoTrabalhando).subscribe(() => {
      this.router.navigate(['alunotrabalhando']);
      this.toastService.showSucesso("Aluno trabalhando cadastrado com sucesso");
    });
  }

  limpar() {
    this.alunoTrabalhando = new AlunoTrabalhando();

    this.filtro = new FilterAlunos();
    this.filtro.aluno = new ComboAluno();
  }

  cancelar() {
    this.router.navigate(['alunotrabalhando']);
  }


  atualizar() {
    this.alunoTrabalhandoService.alterar(this.alunoTrabalhando).subscribe(() => {
      this.router.navigate(['alunotrabalhando']);
      this.toastService.showSucesso("Aluno trabalhando atualizado com sucesso");
    });

  }

  mostrarDadosAluno(idAluno:number) {
    this.alunoService.getById(idAluno).subscribe((aluno: Aluno) => {
      this.alunoTrabalhando.aluno = aluno;
    })
  }


  onValorChange(event: any) {
    this.filtro.aluno = event;
    if(this.filtro.aluno){
      this.mostrarDadosAluno(this.filtro.aluno.id);
    } else {
      this.alunoTrabalhando.aluno = null;
    }
  }


  private carregarCombos() {
    this.alunoService.getAllAlunosByCombo().subscribe((alunos: ComboAluno[]) => {
      this.comboAluno = alunos;
      this.comboAluno.forEach(a => a.nome = a.nome);
      this.comboAluno.sort((a,b) => {
        if (a.nome > b.nome) {return 1;}
        if (a.nome < b.nome) {return -1;}
        return 0;
      });
    });
  }

}
