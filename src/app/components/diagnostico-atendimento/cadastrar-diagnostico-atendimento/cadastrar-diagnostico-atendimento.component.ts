import { Component, OnInit } from '@angular/core';
import { Diagnostico } from 'src/app/core/diagnostico';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast/toast.service';
import { DiagnosticoAtendimentoService } from 'src/app/services/diagnostico-atendimento/diagnostico-atendimento.service';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-cadastrar-diagnostico-atendimento',
  templateUrl: './cadastrar-diagnostico-atendimento.component.html',
  styleUrls: ['./cadastrar-diagnostico-atendimento.component.css']
})
export class CadastrarDiagnosticoAtendimentoComponent implements OnInit {

  diagnostico: Diagnostico = new Diagnostico();
  isAtualizar = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();
  
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private diagnosticoService: DiagnosticoAtendimentoService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) { }


  ngOnInit() {

    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

  if(!this.perfilAcesso.insere){
    this.mostrarBotaoCadastrar = false;
  }
  
  if(!this.perfilAcesso.altera){
    this.mostrarBotaoAtualizar = false;
  }
    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.diagnosticoService.getById(id).subscribe((diagnostico: Diagnostico) => {
        this.diagnostico = diagnostico;
      });
    }
  }

  cadastrar() {
    this.diagnosticoService.cadastrar(this.diagnostico).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Diagnóstico de atendimento com sucesso');
    });
  }

  limpar() {
    this.diagnostico = new Diagnostico();
   }

  cancelar() {
    this.location.back();
  }


  atualizar() {
    this.diagnosticoService.alterar(this.diagnostico).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso('Diagnóstico de atendimento atualizado com sucesso');
    });
  }
  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }

}
