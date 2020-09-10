import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { RateiosMovimentacoes } from 'src/app/core/rateios-movimentacoes';
import { Acesso } from 'src/app/core/acesso';
import { Projeto } from 'src/app/core/projeto';
import { Programa } from 'src/app/core/programa';
import { ControlContainer, NgForm, FormControl } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import * as _ from 'lodash';

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

  pinPrograma    = Date.now();
  pinProjeto     = Date.now();
  pinValor       = Date.now();
  pinCheckRateio = Date.now();

  toogle = new FormControl('', []);
  
  constructor(private drc: ChangeDetectorRef,
              private toastService: ToastService,) { }

  ngOnInit(): void {
    this.toogle.valueChanges.subscribe(newToogleValue=> {
      this.rateio.statusPercentual = newToogleValue;
   });
  }

  ngAfterContentChecked(): void {
    this.drc.detectChanges();
  }

  validarDuplicado() {
    if(this.rateio.programa && this.rateio.programa.id) {
      const jaExiste = this.rateios.find(m => m != this.rateio &&  m.programa.id === this.rateio.programa.id);
      if(jaExiste) {
        this.toastService.showAlerta('Esse programa já está incluso na lista.');
        this.campoPrograma.ngControl.control.setValue(null);
        return;
      }
      if (this.rateio.programa && this.rateio.programa.id) {
        this.rateio.programa = _.cloneDeep(_.find(this.programas,  (c: Programa) => c.id === this.rateio.programa.id));
      }
    }else {
      this.rateio.programa = new Programa();
    }

    
    if(this.rateio.projeto && this.rateio.projeto.id) {
      const jaExiste = this.rateios.find(m => m != this.rateio && m.projeto.id === this.rateio.projeto.id);
      if(jaExiste) {
        this.toastService.showAlerta('Esse projeto já está incluso na lista.');
        this.campoProjeto.ngControl.control.setValue(null);
        return;
      }
      if (this.rateio.projeto && this.rateio.projeto.id) {
        this.rateio.projeto = _.cloneDeep(_.find(this.projetos,  (c: Projeto) => c.id === this.rateio.projeto.id));
      }
    } else {
      this.rateio.projeto = new Projeto();
    }
  }

  deletarRateio() {
    this.rateios.splice(this.index, 1);
  }

  onCampoPorcentagem(rateio: RateiosMovimentacoes) {
    rateio.statusPercentual = !rateio.statusPercentual;

    if(rateio.statusPercentual) {
      rateio.placeHolderRateio = 'Porcentagem';
    } else {
      rateio.placeHolderRateio = 'Valor do rateio';
    }
  }


}
