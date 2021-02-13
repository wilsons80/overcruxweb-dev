import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Acesso } from 'src/app/core/acesso';
import { Material } from 'src/app/core/material';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MaterialService } from 'src/app/services/material/material.service';
import { CarregarPerfil } from 'src/app/core/carregar-perfil';

@Component({
  selector: 'app-cadastrar-material',
  templateUrl: './cadastrar-material.component.html',
  styleUrls: ['./cadastrar-material.component.css']
})
export class CadastrarMaterialComponent implements OnInit {

  material: Material = new Material();

  isAtualizar: boolean = false;

  perfilAcesso: Acesso = new Acesso();
  carregarPerfil: CarregarPerfil  = new CarregarPerfil();

  mostrarBotaoCadastrar = true
  mostrarBotaoAtualizar = true;

  tipos = [
    {id: 'M' , descricao: 'PERMANENTE'},
    {id: 'C' , descricao: 'DE CONSUMO'}
  ]



  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private materialService: MaterialService,
    private toastService: ToastService
  ) { }


  ngOnInit() {
    this.carregarPerfil.carregar(this.activatedRoute.snapshot.data.perfilAcesso, this.perfilAcesso);

    if (!this.perfilAcesso.insere) {
      this.mostrarBotaoCadastrar = false;
    }

    if (!this.perfilAcesso.altera) {
      this.mostrarBotaoAtualizar = false;
    }
    let idMaterial: number;
    idMaterial = this.activatedRoute.snapshot.queryParams.idMaterial ? this.activatedRoute.snapshot.queryParams.idMaterial : null;
    if (idMaterial) {
      this.isAtualizar = true;
      this.materialService.getById(idMaterial).subscribe((material: Material) => {
        this.material = material;
      });
    }

  }
  cadastrar() {
    this.materialService.cadastrar(this.material).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Material cadastrado com sucesso");
    });
  }

  limpar() {
    this.material = new Material();
  }

  cancelar() {
    this.location.back();
  }


  atualizar() {
    this.materialService.alterar(this.material).subscribe(() => {
      this.location.back();
      this.toastService.showSucesso("Material atualizado com sucesso");
    });

  }
  mostrarBotaoLimpar() {
    if (this.isAtualizar) return false;
    if (!this.mostrarBotaoAtualizar) return false;
    if (!this.mostrarBotaoCadastrar) return false;

    return true;
  }

}
