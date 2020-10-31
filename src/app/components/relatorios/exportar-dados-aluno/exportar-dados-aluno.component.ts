import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Aluno } from 'src/app/core/aluno';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { ComboAluno } from 'src/app/core/combo-aluno';
import { ComboPessoaFisica } from 'src/app/core/combo-pessoa-fisica';
import { Programa } from 'src/app/core/programa';
import { Projeto } from 'src/app/core/projeto';
import { Unidade } from 'src/app/core/unidade';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { FuncoesUteisService } from 'src/app/services/commons/funcoes-uteis.service';
import { PessoaFisicaService } from 'src/app/services/pessoa-fisica/pessoa-fisica.service';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { ToastService } from 'src/app/services/toast/toast.service';


export class FilterExportacao{
  beneficiario: ComboAluno;
  cpfAluno: ComboPessoaFisica[];
  maeAluno: ComboPessoaFisica;
  paiAluno: ComboPessoaFisica;
  responsavel: ComboPessoaFisica;
  dataInicioInstituicao: Date;
  dataFimInstituicao: Date;
  programa: Programa;
  projeto: Projeto;
  unidade: Unidade;
}

@Component({
  selector: 'exportar-dados-aluno',
  templateUrl: './exportar-dados-aluno.component.html',
  styleUrls: ['./exportar-dados-aluno.component.css'],
  providers: [CpfPipe],
})
export class ExportarDadosAlunoComponent implements OnInit {
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  comboCpf: ComboPessoaFisica[];
  comboMae: ComboPessoaFisica[];
  comboPai: ComboPessoaFisica[];
  comboResponsaveis: ComboPessoaFisica[];
  comboProgramas: Programa[];
  comboProjetos: Projeto[];
  comboUnidades: Unidade[];

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil;


  filtro: FilterExportacao = new FilterExportacao();

  constructor(private toastService: ToastService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private cpfPipe: CpfPipe,
              private dataUtilService: DataUtilService,
              private alunoService: AlunoService,
              private funcoesUteisService: FuncoesUteisService,
              private programaService: ProgramaService,
              private projetoService: ProjetoService,
              private pessoaFisicaService: PessoaFisicaService,
              private unidadeService: UnidadeService
              ) { 
    this.carregarPerfil = new CarregarPerfil();
  }

  ngOnInit(): void {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    this.carregarCombos();
  }


  consultar() {

  }


  
  onValorChange(event: any) {
    this.filtro.beneficiario = event;
  }

  private carregarCombos(){
    this.programaService.getAllCombo().subscribe((programas: Programa[]) => {
      this.comboProgramas = programas;
    });

    this.projetoService.getAllCombo().subscribe((projetos: Projeto[]) => {
      this.comboProjetos = projetos;
    });


    this.unidadeService.getAllByInstituicaoDaUnidadeLogada().subscribe((unidades: Unidade[]) => {
      this.comboUnidades = unidades;
    });


    this.pessoaFisicaService.getAllPessoasByCombo().subscribe((pessoas: ComboPessoaFisica[]) => {
      this.comboMae   = pessoas;
      this.comboPai   = pessoas;
      this.comboCpf   = pessoas;

      //====================================================================================
      this.comboMae = this.comboMae.filter(a => !!a.nomeMae);
      this.comboMae.sort((a,b) => {
        if (a.nomeMae > b.nomeMae) {return 1;}
        if (a.nomeMae < b.nomeMae) {return -1;}
        return 0;
      });
      this.comboMae = this.funcoesUteisService.arrayDistinct(this.comboMae, 'nomeMae');


      //====================================================================================
      this.comboPai = this.comboPai.filter(a => !!a.nomePai);
      this.comboPai.sort((a,b) => {
        if (a.nomePai > b.nomePai) {return 1;}
        if (a.nomePai < b.nomePai) {return -1;}
        return 0;
      });
      this.comboPai = this.funcoesUteisService.arrayDistinct(this.comboPai, 'nomePai');


      //====================================================================================
      this.comboCpf.forEach(a => {
        a.cpf = a.cpf || '00000000000';
        a.cpf = this.cpfPipe.transform(a.cpf);
      })
      this.comboCpf.sort((a,b) => {
        if (a.cpf > b.cpf) {return 1;}
        if (a.cpf < b.cpf) {return -1;}
        return 0;
      });
      this.comboCpf = this.funcoesUteisService.arrayDistinct(this.comboCpf, 'cpf');
    })

  }


  limpar() {
    this.filtro = new FilterExportacao();
  }


  
  onMascaraDataInput(event) {
    return this.dataUtilService.onMascaraDataInput(event);
  }

}
