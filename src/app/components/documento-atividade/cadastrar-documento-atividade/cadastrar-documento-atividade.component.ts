import { Component, OnInit } from "@angular/core";
import { DocumentoAtividade } from "src/app/core/documento-atividade";
import { Atividade } from "src/app/core/atividade";
import { AtividadeService } from "src/app/services/atividade/atividade.service";
import { DocumentoAtividadeService } from "src/app/services/documento-atividade/documento-atividade.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastService } from "src/app/services/toast/toast.service";
import { Acesso } from 'src/app/core/acesso';
import * as _ from 'lodash';


@Component({
  selector: "app-cadastrar-documento-atividade",
  templateUrl: "./cadastrar-documento-atividade.component.html",
  styleUrls: ["./cadastrar-documento-atividade.component.css"]
})
export class CadastrarDocumentoAtividadeComponent implements OnInit {
  documentoAtividade: DocumentoAtividade = new DocumentoAtividade();
  atividades: Atividade[];

  isAtualizar = false;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  constructor(
    private atividadeService: AtividadeService,
    private documentoAtividadeService: DocumentoAtividadeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit() {


  this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

  if(!this.perfilAcesso.insere){
    this.mostrarBotaoCadastrar = false;
  }
  
  if(!this.perfilAcesso.altera){
    this.mostrarBotaoAtualizar = false;
  }
    this.documentoAtividade.atividade = new Atividade();

    this.atividadeService.getAll().subscribe((atividades: Atividade[]) => {
      this.atividades = atividades;
    });

    let idDocumentoAtividade: number;
    idDocumentoAtividade = this.activatedRoute.snapshot.queryParams
      .idDocumentoAtividade
      ? this.activatedRoute.snapshot.queryParams.idDocumentoAtividade
      : null;
    if (idDocumentoAtividade) {
      this.isAtualizar = true;
      this.documentoAtividadeService
        .getById(idDocumentoAtividade)
        .subscribe((documentoAtividade: DocumentoAtividade) => {
          this.documentoAtividade = documentoAtividade;
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
    this.documentoAtividadeService
      .cadastrar(this.documentoAtividade)
      .subscribe(() => {
        this.router.navigate(["documentoatividade"]);
        this.toastService.showSucesso(
          "Documento Atividade cadastrado com sucesso"
        );
      });
  }

  limpar() {
    this.documentoAtividade = new DocumentoAtividade();
  }

  cancelar() {
    this.router.navigate(["documentoatividade"]);
  }



  atualizar() {
    this.documentoAtividadeService
      .alterar(this.documentoAtividade)
      .subscribe(() => {
        this.router.navigate(["documentoatividade"]);
        this.toastService.showSucesso(
          "Documento Atividade cadastrado com sucesso"
        );
      });
  }

  mostrarDadosAtividade(idAtividade: number) {
    this.documentoAtividade.atividade = _.cloneDeep(_.find(this.atividades, (ati: Atividade) => ati.id === idAtividade));
  }

}
