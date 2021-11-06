import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';
import { Doadores } from 'src/app/core/doadores';
import { Empresa } from 'src/app/core/empresa';
import { FilterEmpresa } from 'src/app/core/filter-empresa';
import { PessoaFisica } from 'src/app/core/pessoa-fisica';
import { TiposDoadores } from 'src/app/core/tipos-doadores';
import { DataUtilService } from 'src/app/services/commons/data-util.service';
import { DoadoresService } from 'src/app/services/doadores/doadores.service';
import { TiposDoadoresService } from 'src/app/services/tipos-doadores/tipos-doadores.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FilterPessoaFisica } from './../../../core/filter-pessoa-fisica';
import { EmpresaService } from './../../../services/empresa/empresa.service';
import { PessoaFisicaService } from './../../../services/pessoa-fisica/pessoa-fisica.service';
import {BeneficioSocial} from '../../../core/beneficio-social';
import {BeneficioSocialService} from '../../../services/beneficio-social/beneficio-social';

@Component({
  selector: 'cadastrar-beneficil',
  templateUrl: './cadastrar-beneficil-social.component.html',
  styleUrls: ['./cadastrar-beneficil-social.component.css']
})
export class CadastrarBeneficilSocialComponent implements OnInit {


  beneficioSocial: BeneficioSocial;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  isAtualizar: boolean = false;

  constructor(
    private beneficioSocialService: BeneficioSocialService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private dataUtilService: DataUtilService,
     private cd: ChangeDetectorRef,
  ) {
  }


  ngAfterContentChecked(): void {
    this.cd.detectChanges();
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

    const id = this.activatedRoute.snapshot.queryParams.id ? this.activatedRoute.snapshot.queryParams.id : null;
    if (id) {
      this.isAtualizar = true;
      this.beneficioSocialService.getById(id).subscribe((beneficioSocial: BeneficioSocial) => {
        this.beneficioSocial = beneficioSocial;
      });
    }
  }

  inicializarObjetos() {
    this.beneficioSocial = new BeneficioSocial();
  }

  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

  cadastrar() {
    this.beneficioSocialService.cadastrar(this.beneficioSocial).subscribe(() => {
      this.toastService.showSucesso("Cadastro realizado com sucesso");
      this.router.navigate(['beneficiossociais']);
    });
  }


  limpar() {
    this.inicializarObjetos();
  }

  cancelar() {
    this.router.navigate(['beneficiossociais']);
  }

  atualizar() {
    this.beneficioSocialService.alterar(this.beneficioSocial).subscribe(() => {
      this.router.navigate(['beneficiossociais']);
      this.toastService.showSucesso("Beneficio social atualizado com sucesso");
    });

  }

  isObrigatorio(elm:any){
    if(elm == null || elm.id == null) return true;
    return false;
  }

}
