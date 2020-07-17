import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { RateiosMovimentacoes } from 'src/app/core/rateios-movimentacoes';
import { Acesso } from 'src/app/core/acesso';
import { Projeto } from 'src/app/core/projeto';
import { Programa } from 'src/app/core/programa';
import { ControlContainer, NgForm } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'formulario-rateio',
  templateUrl: './formulario-rateio.component.html',
  styleUrls: ['./formulario-rateio.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormularioRateioComponent implements OnInit {

  @ViewChild('campoPrograma', {static: false}) campoPrograma;
  @ViewChild('campoProjeto', {static: false}) campoProjeto;

  @Input() rateios: RateiosMovimentacoes[];
  @Input() index: number;
  @Input() rateio: RateiosMovimentacoes;
  @Input() perfilAcesso: Acesso;
  @Input() programas: Programa[];
  @Input() projetos: Projeto[];

  @Output() onDeletarRegistro = new EventEmitter();

  pinPrograma = Date.now();
  pinProjeto  = Date.now();
  pinValor    = Date.now();

  constructor(private drc: ChangeDetectorRef,
              private toastService: ToastService,) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this.drc.detectChanges();
  }

  validarDuplicado() {
    if(this.rateio.programa && this.rateio.programa.id) {
      const jaExiste = this.rateios.find(m => m.id !== this.rateio.id && m.programa.id === this.rateio.programa.id);
      if(jaExiste) {
        this.toastService.showAlerta('Esse programa já está incluso na lista.');
        this.campoPrograma.ngControl.control.setValue(null);
        return;
      }
    }
    
    if(this.rateio.projeto && this.rateio.projeto.id) {
      const jaExiste = this.rateios.find(m => m.id !== this.rateio.id && m.projeto.id === this.rateio.projeto.id);
      if(jaExiste) {
        this.toastService.showAlerta('Esse projeto já está incluso na lista.');
        this.campoProjeto.ngControl.control.setValue(null);
        return;
      }
    }
  }

  deletarRateio() {
    this.onDeletarRegistro.emit(this.rateio);
  }

  onCampoPorcentagem(rateio: any) {
    rateio.statusPercentual = !rateio.statusPercentual;

    if(rateio.statusPercentual) {
      rateio.placeHolderRateio = 'Porcentagem';
    } else {
      rateio.placeHolderRateio = 'Valor do rateio';
    }
  }


}
