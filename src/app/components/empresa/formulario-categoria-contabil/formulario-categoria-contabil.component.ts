import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Acesso } from 'src/app/core/acesso';
import { ControlContainer, NgForm, FormControl } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import * as _ from 'lodash';
import { PlanosContas } from 'src/app/core/planos-contas';
import { CategoriasContabeisEmpresas } from 'src/app/core/categorias-contabeis-empresas';

@Component({
  selector: 'formulario-categoria-contabil',
  templateUrl: './formulario-categoria-contabil.component.html',
  styleUrls: ['./formulario-categoria-contabil.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormularioCategoriaContabilComponent implements OnInit {

  @ViewChild('campoPrograma', {static: false}) campoPrograma;
  @ViewChild('campoCategoriaContabil', {static: false}) campoCategoriaContabil;

  @Input() categoriasContabeis: CategoriasContabeisEmpresas[];
  @Input() categoriaContabil: CategoriasContabeisEmpresas;
  @Input() index: number;
  @Input() perfilAcesso: Acesso;
  @Input() planosContas: PlanosContas[];

  categoriaContabilSelecionado: PlanosContas = new PlanosContas();

  
  constructor(private drc: ChangeDetectorRef,
              private toastService: ToastService,) { }

  ngOnInit(): void {
    this.categoriaContabilSelecionado = new PlanosContas();
  }

  ngAfterContentChecked(): void {
    this.drc.detectChanges();

    if(!!this.categoriaContabil.idCategoria && !!this.planosContas){
      const planoConta = this.planosContas.find(p => p.id === this.categoriaContabil.idCategoria);
      this.categoriaContabilSelecionado = planoConta;
    }
  }

  validarDuplicado() {
    if(this.categoriaContabil.idCategoria) {
      const jaExiste = this.categoriasContabeis.find(m => m != this.categoriaContabil &&  m.idCategoria === this.categoriaContabil.idCategoria);
      if(jaExiste) {
        this.toastService.showAlerta('Essa categoria contábil já está existe na lista.');
        this.campoCategoriaContabil.comboRubrica.itensSelect.ngControl.control.setValue(null);
        this.categoriaContabilSelecionado = new PlanosContas();
      } else {
        if(this.categoriaContabilSelecionado.id && this.categoriaContabil.idCategoria !== this.categoriaContabilSelecionado.id){
          const planoConta = this.planosContas.find(p => p.id === this.categoriaContabil.idCategoria);
          this.categoriaContabil.idCategoria = planoConta.id;
        }
      }
    }   
    
  }

  deletar() {
    this.categoriasContabeis.splice(this.index, 1);
  }

  onCarregarContaContabil(registro: any) {
    this.categoriaContabilSelecionado = registro;     
    
    if(registro.id) {
      this.categoriaContabil.idCategoria = registro.id;
      this.validarDuplicado();
    }else{  
      this.categoriaContabil.idCategoria = null;
    }

  }
  
}
