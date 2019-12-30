import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrausInstrucao } from 'src/app/core/graus-instrucao';
import { GrausInstrucaoService } from 'src/app/services/graus-instrucao/graus-instrucao.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'app-cadastrar-graus-instrucao',
  templateUrl: './cadastrar-graus-instrucao.component.html',
  styleUrls: ['./cadastrar-graus-instrucao.component.css']
})
export class CadastrarGrausInstrucaoComponent implements OnInit {

  grausInstrucao: GrausInstrucao = new GrausInstrucao();

  isAtualizar: boolean = false;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private grausInstrucaoService: GrausInstrucaoService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) {
  }


  ngOnInit() {
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }

    let idGrausInstrucao: number;
    idGrausInstrucao = this.activatedRoute.snapshot.queryParams.idGrausInstrucao ? this.activatedRoute.snapshot.queryParams.idGrausInstrucao : null;
    if (idGrausInstrucao) {
      this.isAtualizar = true;
      this.grausInstrucaoService.getById(idGrausInstrucao).subscribe((grausInstrucao: GrausInstrucao) => {
        this.grausInstrucao = grausInstrucao;
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
    this.grausInstrucaoService.cadastrar(this.grausInstrucao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Grau de Instrução cadastrado com sucesso");
    });
  }

  limpar() {
    this.grausInstrucao = new GrausInstrucao()
  }

  cancelar() {
    this.location.back();
  }



  atualizar() {
    this.grausInstrucaoService.alterar(this.grausInstrucao).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Grau de Instrução atualizado com sucesso");
    });

  }

}
