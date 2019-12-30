import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/core/atividade';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { CadastroReservaAtividadeService } from 'src/app/services/cadastro-reserva-atividade/cadastro-reserva-atividade.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CadastroReservaAtividade } from './../../../core/cadastro-reserva-atividade';
import { PessoaFisicaService } from './../../../services/pessoa-fisica/pessoa-fisica.service';
import { Acesso } from 'src/app/core/acesso';
import * as _ from 'lodash';


@Component({
  selector: 'app-cadastrar-cadastro-reserva-atividade',
  templateUrl: './cadastrar-cadastro-reserva-atividade.component.html',
  styleUrls: ['./cadastrar-cadastro-reserva-atividade.component.css']
})
export class CadastrarCadastroReservaAtividadeComponent implements OnInit {

  cadastroReserva: CadastroReservaAtividade = new CadastroReservaAtividade()
  pessoas: PessoaFisica[];
  atividades: Atividade[];

  isAtualizar = false;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private cadastroReservaAtividadeService: CadastroReservaAtividadeService,
    private pessoaService: PessoaFisicaService,
    private atividadeService: AtividadeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit() {
   
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }

    this.cadastroReserva.pessoasFisica = new PessoaFisica();
    this.cadastroReserva.atividade = new Atividade();

    this.pessoaService.getAll().subscribe((pessoas: PessoaFisica[]) => {
      this.pessoas = pessoas;
    })

    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    })

    let idCadastroReserva: number;
    idCadastroReserva = this.activatedRoute.snapshot.queryParams.idCadastroReserva ? this.activatedRoute.snapshot.queryParams.idCadastroReserva : null;
    if (idCadastroReserva) {
      this.isAtualizar = true;
      this.cadastroReservaAtividadeService.getById(idCadastroReserva).subscribe((cadastroReserva: CadastroReservaAtividade) => {
        this.cadastroReserva = cadastroReserva
      });
    }

  }

  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }
  
  cadastrar() {
    this.cadastroReservaAtividadeService.cadastrar(this.cadastroReserva).subscribe(() => {
      this.router.navigate(['cadastroreservaatividade']);
      this.toastService.showSucesso("Cadastro de Reserva da Atividade cadastrado com sucesso");
    });
  }

  limpar() {
    this.cadastroReserva = new CadastroReservaAtividade();
    this.cadastroReserva.atividade = new Atividade();
  }

  cancelar() {
    this.router.navigate(['cadastroreservaatividade']);
  }


  atualizar() {
    this.cadastroReservaAtividadeService.alterar(this.cadastroReserva).subscribe(() => {
      this.router.navigate(['cadastroreservaatividade']);
      this.toastService.showSucesso("Cadastro de Reserva da Atividade atualizado com sucesso");
    });

  }

  mostrarDadosAtividade(idAtividade: number) {
    this.cadastroReserva.atividade = _.cloneDeep(_.find(this.atividades, (ati: Atividade) => ati.id === idAtividade));
  }
}
