import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Indicadores } from 'src/app/core/indicadores';
import { Metas } from 'src/app/core/metas';
import { IniciativaService } from 'src/app/services/iniciativa/iniciativa.service';
import { MetasService } from 'src/app/services/metas/metas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iniciativa } from 'src/app/core/iniciativa';
import { IndicadoresService } from 'src/app/services/indicadores/indicadores.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Acesso } from 'src/app/core/acesso';

@Component({
  selector: 'app-cadastrar-metas',
  templateUrl: './cadastrar-metas.component.html',
  styleUrls: ['./cadastrar-metas.component.css']
})
export class CadastrarMetasComponent implements OnInit {

  indicadores: Indicadores[];
  metas: Metas;

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private indicadoresService: IndicadoresService,
    private metasService: MetasService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private toastService:ToastService
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

    this.indicadoresService.getAll().subscribe((indicadores: Indicadores[]) => {
      this.indicadores = indicadores;
    })

    let idMetas: number;
    idMetas = this.activatedRoute.snapshot.queryParams.idMetas ? this.activatedRoute.snapshot.queryParams.idMetas : null;
    if (idMetas) {
      this.isAtualizar = true;
      this.metasService.getById(idMetas).subscribe((metas: Metas) => {
        this.metas = metas
      });
    }

  }
  inicializarObjetos() {
    this.metas = new Metas();
    this.metas.indicadores = new Indicadores();
  }
  
  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }
  cadastrar() {
    this.metasService.cadastrar(this.metas).subscribe(() => {
      this.router.navigate(['metas']);
      this.toastService.showSucesso("Meta cadastrada com sucesso");
    });
  }

  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['metas']);
  }


  atualizar() {
    this.metasService.alterar(this.metas).subscribe(() => {
      this.router.navigate(['metas']);
      this.toastService.showSucesso("Meta atualizada com sucesso");
    });

  }

}
