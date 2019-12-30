import { Component, OnInit } from '@angular/core';
import { TipoOcorrenciaAluno } from 'src/app/core/tipo-ocorrencia-aluno';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TipoOcorrenciaAlunoService } from 'src/app/services/tipo-ocorrencia-aluno/tipo-ocorrencia-aluno.service';

@Component({
  selector: 'cadastrar-tipo-ocorrencia-aluno',
  templateUrl: './cadastrar-tipo-ocorrencia-aluno.component.html',
  styleUrls: ['./cadastrar-tipo-ocorrencia-aluno.component.css']
})
export class CadastrarTipoOcorrenciaAlunoComponent implements OnInit {

  tipoocorrenciaaluno: TipoOcorrenciaAluno = new TipoOcorrenciaAluno();

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;


  constructor(
    private tipoOcorrenciaAlunoService: TipoOcorrenciaAlunoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }


  ngOnInit() {

    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }


    let id: number;
    id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.tipoOcorrenciaAlunoService.getById(id).subscribe((tipoocorrenciaaluno: TipoOcorrenciaAluno) => {
        this.tipoocorrenciaaluno = tipoocorrenciaaluno;
      });
    }

  }

  mostrarBotaoLimpar(){
    if (this.isAtualizar)  { return false; }
    if (!this.mostrarBotaoAtualizar) { return false; }
    if (!this.mostrarBotaoCadastrar) { return false; }

    return true;
  }


  cadastrar() {
    this.tipoOcorrenciaAlunoService.cadastrar(this.tipoocorrenciaaluno).subscribe(() => {
      this.router.navigate(['tipoocorrenciaaluno']);
      this.toastService.showSucesso('Tipo de ocorrência cadastrado com sucesso!');
    });
  }

  limpar() {
    this.tipoocorrenciaaluno = new TipoOcorrenciaAluno();
  }

  cancelar() {
    this.router.navigate(['tipoocorrenciaaluno']);
  }


  atualizar() {
    this.tipoOcorrenciaAlunoService.alterar(this.tipoocorrenciaaluno).subscribe(() => {
      this.router.navigate(['tipoocorrenciaaluno']);
      this.toastService.showSucesso('Tipo de ocorrência atualizado com sucesso.');
    });

  }



}
