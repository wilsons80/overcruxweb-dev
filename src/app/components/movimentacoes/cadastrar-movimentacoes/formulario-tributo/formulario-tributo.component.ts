import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import * as _ from 'lodash';
import { Acesso } from 'src/app/core/acesso';
import { Fatura } from 'src/app/core/fatura';
import { TributoMovimentacao } from 'src/app/core/tributo-movimentacao';
import { Tributos } from 'src/app/core/tributos';
import { ToastService } from 'src/app/services/toast/toast.service';


@Component({
  selector: 'formulario-tributo',
  templateUrl: './formulario-tributo.component.html',
  styleUrls: ['./formulario-tributo.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormularioTributoComponent implements OnInit {

  @ViewChild('comboTributos', {static: false}) comboTributos;
  
  @Input() tributosMovimentacao: TributoMovimentacao[];
  @Input() index: number;
  @Input() tributoMovimentacao: TributoMovimentacao;
  @Input() tributos: Tributos[];
  @Input() perfilAcesso: Acesso;
  @Input() faturas: Fatura[];
  @Input() showInputValor = true;

  pinTributo     = Date.now();
  pinValor       = Date.now();
  pinRecebedor   = Date.now();

 
  constructor(private drc: ChangeDetectorRef,
              private toastService: ToastService,) { }

  ngOnInit(): void {
  }
  
  ngAfterContentChecked(): void {
    if(this.tributoMovimentacao.tributo){
      this.selecionaTributo(this.tributoMovimentacao.tributo.id);
    }
    this.drc.detectChanges();
  }

  deletar() {
    this.tributosMovimentacao.splice(this.index, 1);
  }

  onValorTributoChange(item) {
    this.tributoMovimentacao.tributo = item;
  }

  selecionaTributo(idTributo: number) {
    if(this.tributos) {
      const tributo = this.tributos.find((item: any) => item.id === idTributo);
      if (!!tributo) {
        this.onValorTributoChange(tributo);
      }
    }
  }

  validarCadastroTributos() {
    if(this.comboTributos && this.tributoMovimentacao.tributo && this.tributoMovimentacao.tributo.id) {
      const jaExiste = this.tributosMovimentacao.find(m => m != this.tributoMovimentacao && m.tributo.id === this.tributoMovimentacao.tributo.id);
      if(jaExiste) {
        this.toastService.showAlerta('Esse tributo já está incluso.');
        return;
      }
      if (this.tributoMovimentacao && this.tributoMovimentacao.id) {
          this.tributoMovimentacao = _.cloneDeep(_.find(this.tributosMovimentacao,  (c: TributoMovimentacao) => c.id === this.tributoMovimentacao.id));
      }
    } else {
      this.tributoMovimentacao = new TributoMovimentacao();
    }

  }

}
