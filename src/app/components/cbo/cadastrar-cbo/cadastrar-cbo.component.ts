import { Component, OnInit } from '@angular/core';
import { Acesso } from 'src/app/core/acesso';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { CboService } from 'src/app/services/cbo/cbo.service';
import { Cbo } from 'src/app/core/cbo';

@Component({
  selector: 'cadastrar-cbo',
  templateUrl: './cadastrar-cbo.component.html',
  styleUrls: ['./cadastrar-cbo.component.css']
})
export class CadastrarCboComponent implements OnInit {

  cbo: Cbo = new Cbo();

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  public maskNumeroCBO  = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/];

  constructor(
    private cboService: CboService,
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
      this.cboService.getById(id).subscribe((cbo: Cbo) => {
        this.cbo = cbo;
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
    this.cboService.cadastrar(this.cbo).subscribe(() => {
      this.router.navigate(['cbo']);
      this.toastService.showSucesso('CBO cadastradO com sucesso');
    });
  }

  limpar() {
    this.cbo = new Cbo();
  }

  cancelar() {
    this.router.navigate(['cbo']);
  }


  atualizar() {
    this.cboService.alterar(this.cbo).subscribe(() => {
      this.router.navigate(['cbo']);
      this.toastService.showSucesso('CBO atualizado com sucesso');
    });

  }


}
