import { ParceriasCategoriasModule } from './../../common/parcerias-categorias/parcerias-categorias.module';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iniciativa } from 'src/app/core/iniciativa';
import { Programa } from 'src/app/core/programa';
import { Projeto } from 'src/app/core/projeto';
import { ProgramaService } from 'src/app/services/programa/programa.service';
import { ProjetoService } from 'src/app/services/projeto/projeto.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Acesso } from 'src/app/core/acesso';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-cadastrar-projeto',
  templateUrl: './cadastrar-projeto.component.html',
  styleUrls: ['./cadastrar-projeto.component.css']
})
export class CadastrarProjetoComponent implements OnInit {

  programas: Programa[];
  projeto: Projeto;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private programaService: ProgramaService,
    private projetoService: ProjetoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataUtilService: DataUtilService,
    private toastService: ToastService
  ) {

  }


  ngOnInit() {

    this.inicializarObjetos()

    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }

    this.programaService.getAll().subscribe((programas: Programa[]) => {
      this.programas = programas;
    })

    let idProjeto: number;
    idProjeto = this.activatedRoute.snapshot.queryParams.idProjeto ? this.activatedRoute.snapshot.queryParams.idProjeto : null;
    if (idProjeto) {
      this.isAtualizar = true;
      this.projetoService.getById(idProjeto).subscribe((projeto: Projeto) => {
        this.projeto = projeto;
        if (!this.projeto.programa) {
          this.projeto.programa = new Programa();
        }
      });
    }

  }
  inicializarObjetos() {
    this.projeto = new Projeto();
    this.projeto.programa = new Programa();
    this.projeto.iniciativa = new Iniciativa();
    this.projeto.unidades = [];
    this.projeto.colaboradoresProjeto = [];
    this.projeto.parceriasProjeto = [];
    this.projeto.composicaoRhProjeto = [];
    this.projeto.materiaisProjeto = [];
    this.projeto.contasCentrosCusto = [];
  }
  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    if(!this.isValoresAditivosValidos()) {
      this.toastService.showAlerta('ATENÇÃO: A soma das categorias e seus aditivos é diferente da soma do parceiro e seus aditivos.');
      return;
    }
    
    if (!this.isDataProjetoEntreDataPrograma()) {
      this.toastService.showAlerta("Operação não realizada. As datas do projeto estão diferentes das datas do programa selecionado.");
      return;
    }

    this.projetoService.cadastrar(this.projeto).subscribe(() => {
      this.toastService.showSucesso("Projeto cadastrado com sucesso");
    });
  }



  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['projetos']);
  }

  atualizar() {
    if(!this.isValoresAditivosValidos()) {
      this.toastService.showAlerta('ATENÇÃO: A soma das categorias e seus aditivos é diferente da soma do parceiro e seus aditivos.');
      return;
    }
    
    if (!this.isDataProjetoEntreDataPrograma()) {
      this.toastService.showAlerta("Operação não realizada. As datas do projeto estão diferentes das datas do programa selecionado.");
      return;
    }

    this.projetoService.alterar(this.projeto).subscribe(() => {
      this.toastService.showSucesso("Projeto atualizado com sucesso");
    });

  }


  
  isValoresAditivosValidos(): boolean {
    let valorTotalParceria = null;
    let valorTotalAditivoParceria = null;

    let valorTotalCategoria = null;
    let valorTotalAditivoCategoria = null;

    this.projeto.parceriasProjeto.forEach(p =>  {
      valorTotalParceria += p.valorParceria;
      p.aditivosParceriasProjeto.forEach(a => valorTotalAditivoParceria += a.valorAditivo);

      p.parceriasCategorias.forEach(p => {
        valorTotalCategoria += p.valorParceriaCategoria;
        p.aditivosParceriasCategorias.forEach(a => valorTotalAditivoCategoria += a.valorAditivo);
      });
    })

    let totalParceria  = null;
    if(valorTotalAditivoParceria){
      totalParceria  = Number(valorTotalParceria.toFixed(2))  + Number(valorTotalAditivoParceria.toFixed(2));
    }
    
    let totalCategoria = null;
    if(valorTotalAditivoCategoria) {
      totalCategoria = Number(valorTotalCategoria.toFixed(2)) + Number(valorTotalAditivoCategoria.toFixed(2));
    }

    if(totalCategoria && totalParceria != totalCategoria) {return false;}
    return true;
  }

  isDataProjetoEntreDataPrograma(): boolean {    
    if (this.projeto.programa && this.projeto.programa.dataInicio) {    
      let dataInicioPrograma: Date = this.dataUtilService.getDataTruncata(this.projeto.programa.dataInicio);
      let dataFimPrograma: Date    = this.dataUtilService.getDataTruncata(this.projeto.programa.dataFim);
      
      return this.dataUtilService.isEntreDatasTruncada(this.projeto.dataInicio, this.projeto.dataFim, dataInicioPrograma, dataFimPrograma);
    }   
    return true;
  }
}
