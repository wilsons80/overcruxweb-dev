import { GrausInstrucaoService } from './../../../services/graus-instrucao/graus-instrucao.service';
import { Cbo } from './../../../core/cbo';
import { CboService } from './../../../services/cbo/cbo.service';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/core/cargo';
import { CargosService } from 'src/app/services/cargos/cargos.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TipoCargo } from 'src/app/core/tipo-cargo';
import { Acesso } from 'src/app/core/acesso';
import { GrausInstrucao } from 'src/app/core/graus-instrucao';

@Component({
  selector: 'app-cadastrar-cargo',
  templateUrl: './cadastrar-cargo.component.html',
  styleUrls: ['./cadastrar-cargo.component.css']
})
export class CadastrarCargoComponent implements OnInit {
  @ViewChild('formCadastro', { static: false }) formCadastro;
  
  cargo: Cargo = new Cargo();

  cbos: Cbo[] = [];

  perfilAcesso: Acesso;
  mostrarBotaoCadastrar = true;
  mostrarBotaoAtualizar = true;

  isAtualizar = false;

  tiposCargo: TipoCargo = new TipoCargo();
  grausInstrucao: GrausInstrucao[] = [];

  constructor(
    private cargoService: CargosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private cboService: CboService,
    private grausInstrucaoService:GrausInstrucaoService
  ) { }


  ngOnInit() {

    this.limpar();



    this.perfilAcesso = this.activatedRoute.snapshot.data.perfilAcesso[0];

    if(!this.perfilAcesso.insere){
      this.mostrarBotaoCadastrar = false;
    }

    if(!this.perfilAcesso.altera){
      this.mostrarBotaoAtualizar = false;
    }


    let idCargo: number;
    idCargo = this.activatedRoute.snapshot.queryParams.idCargo ? this.activatedRoute.snapshot.queryParams.idCargo : null;
    if (idCargo) {
      this.isAtualizar = true;
      this.cargoService.getById(idCargo).subscribe((cargo: Cargo) => {
        this.cargo = cargo;

        if( !this.cargo.cbo) {
          this.cargo.cbo = new Cbo();
        }
        if(!this.cargo.grausInstrucao){
          this.cargo.grausInstrucao = new GrausInstrucao();
        }
      });
    }

    this.grausInstrucaoService.getAll().subscribe((graus: GrausInstrucao[])=> {
      this.grausInstrucao = graus;
    })
    this.cboService.getAll().subscribe((cbos: Cbo[]) => {
      this.cbos = cbos;
    });

  }

  mostrarBotaoLimpar(){
    if(this.isAtualizar) return false;
    if(!this.mostrarBotaoAtualizar) return false;
    if(!this.mostrarBotaoCadastrar) return false;

    return true;
  }
  cadastrar() {
    this.cargoService.cadastrar(this.cargo).subscribe(() => {
      this.router.navigate(['cargo']);
      this.toastService.showSucesso("Cargo cadastrada com sucesso");
    });
  }

  limpar() {
    this.cargo = new Cargo();
    this.cargo.cbo = new Cbo();
    this.cargo.grausInstrucao = new GrausInstrucao();
  }

  cancelar() {
    this.router.navigate(['cargo']);
  }


  atualizar() {
    this.cargoService.alterar(this.cargo).subscribe(() => {
      this.router.navigate(['cargo']);
      this.toastService.showSucesso("Cargo cadastrada com sucesso");
    });

  }

}
