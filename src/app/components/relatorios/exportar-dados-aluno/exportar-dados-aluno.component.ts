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
import { ComboProjetoModule } from '../../common/combo-projeto/combo-projeto.module';
import { ComboPrograma } from 'src/app/core/combo-programa';
import { ComboProjeto } from 'src/app/core/combo-projeto';


export class FilterExportacao{
  beneficiario: ComboAluno;
  cpfAluno: ComboPessoaFisica[];
  maeAluno: ComboPessoaFisica;
  paiAluno: ComboPessoaFisica;
  responsavel: ComboPessoaFisica;
  dataInicioInstituicao: Date;
  dataFimInstituicao: Date;
  programa: ComboPrograma;
  projeto: ComboProjeto;
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

  limpar() {
    this.filtro = new FilterExportacao();
  }
  
  onValorChange(event: any) {
    this.filtro.beneficiario = event;
  }



  
  private carregarCombos(){
    this.unidadeService.getAllByInstituicaoDaUnidadeLogada().subscribe((unidades: Unidade[]) => {
      this.comboUnidades = unidades;
    });

    this.pessoaFisicaService.getAllPessoasByCombo().subscribe((pessoas: ComboPessoaFisica[]) => {
      this.comboMae   = pessoas;
      this.comboPai   = pessoas;
      this.comboCpf   = pessoas;
      
      this.comboMae = this.ordenarComboMaeDistinct(this.comboMae);
      this.comboPai = this.ordenarComboPaiDistinct(this.comboPai);
      this.comboCpf = this.ordenarComboCpfDistinct(this.comboCpf);
    });
  }

  private ordenarComboCpfDistinct(comboCpf: any): any[] {
    comboCpf.forEach(a => {
      a.cpf = a.cpf || '00000000000';
      a.cpf = this.cpfPipe.transform(a.cpf);
    });
    comboCpf = this.funcoesUteisService.ordernarArray(comboCpf, 'cpf');
    comboCpf = this.funcoesUteisService.arrayDistinct(comboCpf, 'cpf');
    return comboCpf;
  }

  private ordenarComboMaeDistinct(comboMae: any): any[] {
    comboMae = comboMae.filter(a => !!a.nomeMae);
    comboMae = this.funcoesUteisService.ordernarArray(comboMae, 'nomeMae');
    comboMae = this.funcoesUteisService.arrayDistinct(comboMae, 'nomeMae');
    return comboMae;
  }

  private ordenarComboPaiDistinct(comboPai: any): any[] {
    comboPai = this.comboPai.filter(a => !!a.nomePai);
    comboPai = this.funcoesUteisService.ordernarArray(comboPai, 'nomePai');
    comboPai = this.funcoesUteisService.arrayDistinct(comboPai, 'nomePai');
    return comboPai;
  }
  
  onMascaraDataInput(event) {
    return this.dataUtilService.onMascaraDataInput(event);
  }

  onValorChangePrograma(registro: any) {
    this.filtro.programa = registro;
  }

  onValorChangeProjeto(registro: any) {
    this.filtro.projeto = registro;
  }

}
