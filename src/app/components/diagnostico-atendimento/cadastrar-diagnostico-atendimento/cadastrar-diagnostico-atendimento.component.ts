import { Component, OnInit } from '@angular/core';
import { Diagnostico } from 'src/app/core/diagnostico';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from 'src/app/services/toast/toast.service';
import { DiagnosticoAtendimentoService } from 'src/app/services/diagnostico-atendimento/diagnostico-atendimento.service';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'app-cadastrar-diagnostico-atendimento',
  templateUrl: './cadastrar-diagnostico-atendimento.component.html',
  styleUrls: ['./cadastrar-diagnostico-atendimento.component.css']
})
export class CadastrarDiagnosticoAtendimentoComponent implements OnInit {

  diagnostico: Diagnostico = new Diagnostico();
  isAtualizar = false;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private diagnosticoService: DiagnosticoAtendimentoService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
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
