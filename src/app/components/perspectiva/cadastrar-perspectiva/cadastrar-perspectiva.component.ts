import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Perspectiva } from 'src/app/core/perspectiva';
import { Unidade } from 'src/app/core/unidade';
import { UnidadeService } from 'src/app/services/unidade/unidade.service';
import { PerspectivaService } from './../../../services/perspectiva/perspectiva.service';
import { ToastService } from './../../../services/toast/toast.service';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'app-cadastrar-perspectiva',
  templateUrl: './cadastrar-perspectiva.component.html',
  styleUrls: ['./cadastrar-perspectiva.component.css']
})
export class CadastrarPerspectivaComponent implements OnInit {

  unidades: Unidade[];
  perspectiva: Perspectiva;

  isAtualizar: boolean = false;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;


  constructor(
    private unidadeService: UnidadeService,
    private perspectivaService: PerspectivaService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private router:Router
  ) {
    
  }


  ngOnInit() {

    this.inicializarObjetos();
    
    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }
    
    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }
    this.unidadeService.getAllUnidadesUsuarioLogadoTemAcesso().subscribe((unidades: Unidade[]) => {
      this.unidades = unidades;
    })

    let idPerspectiva: number;
    idPerspectiva = this.activatedRoute.snapshot.queryParams.idPerspectiva ? this.activatedRoute.snapshot.queryParams.idPerspectiva : null;
    if (idPerspectiva) {
      this.isAtualizar = true;
      this.perspectivaService.getById(idPerspectiva).subscribe((perspectiva: Perspectiva) => {
        this.perspectiva = perspectiva
      });
    }

  }
  inicializarObjetos() {
    this.perspectiva = new Perspectiva();
    this.perspectiva.unidade = new Unidade();
  }
  cadastrar() {
    this.perspectivaService.cadastrar(this.perspectiva).subscribe(() => {
      this.router.navigate(['perspectiva']);
      this.toastService.showSucesso("Perspectiva cadastrada com sucesso");
    });
  }

  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['perspectiva']);
  }



  atualizar() {
    this.perspectivaService.alterar(this.perspectiva).subscribe(() => {
      this.router.navigate(['perspectiva']);
      this.toastService.showSucesso("Perspectiva atualizada com sucesso");
    });

  }

}
