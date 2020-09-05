import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, FormControl, NgForm } from '@angular/forms';
import { Acesso } from 'src/app/core/acesso';
import { RateiosMovimentacoesUnidades } from 'src/app/core/rateios-movimentacoes-unidades';
import { Unidade } from 'src/app/core/unidade';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'formulario-rateio-unidade',
  templateUrl: './formulario-rateio-unidade.component.html',
  styleUrls: ['./formulario-rateio-unidade.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormularioRateioUnidadeComponent implements OnInit {
  @ViewChild('campoUnidade', {static: false}) campoUnidade;
  
  @Input() rateios: RateiosMovimentacoesUnidades[];
  @Input() index: number;
  @Input() rateio: RateiosMovimentacoesUnidades;
  @Input() perfilAcesso: Acesso;
  @Input() unidades: Unidade[];

  pinUnidade     = Date.now();
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
    if(this.rateio.idUnidade) {
      const jaExiste = this.rateios.find(m => m != this.rateio &&  m.idUnidade === this.rateio.idUnidade);
      if(jaExiste) {
        this.toastService.showAlerta('Essa unidade já está inclusa na lista.');
        this.campoUnidade.ngControl.control.setValue(null);
        return;
      }
    }
  }

  deletarRateio() {
    this.rateios.splice(this.index, 1);
  }

  onCampoPorcentagem(rateio: RateiosMovimentacoesUnidades) {
    rateio.statusPercentual = !rateio.statusPercentual;

    if(rateio.statusPercentual) {
      rateio.placeHolderRateio = 'Porcentagem';
    } else {
      rateio.placeHolderRateio = 'Valor do rateio';
    }
  }
}
