import { Familiares } from 'src/app/core/familiares';
import { Component, OnInit, Input, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FamiliarAlunoService } from 'src/app/services/familiar-aluno/familiar-aluno.service';
import { BroadcastEventService } from 'src/app/services/broadcast-event/broadcast-event.service';

@Component({
  selector: 'responsavel',
  templateUrl: './responsavel.component.html',
  styleUrls: ['./responsavel.component.css']
})
export class ResponsavelComponent implements OnInit, AfterContentChecked {

  @Input() familiar: Familiares;

  mensagemResponsavelVigente: string = null;
  openFormCadastro = true;

  constructor(private familiarAlunoService: FamiliarAlunoService,
              protected drc: ChangeDetectorRef) { }

  ngOnInit() {
    BroadcastEventService.get('ON_RESPONSAVEL_VIGENTE_ALUNO').subscribe((idAluno: number) => {
      this.mostrarResponsavelVigente(idAluno);
    });
  }

  ngAfterContentChecked(): void {
    this.drc.detectChanges();
  }

  onGetAdicionar(evento) {
    this.openFormCadastro = evento;
  }

  private mostrarResponsavelVigente(idAluno: number) {
    this.familiarAlunoService.getResponsavelVigente(idAluno).subscribe((responsavel: any) => {
      BroadcastEventService.get('ON_RESPONSAVEL_VIGENTE').emit(responsavel);

      if (responsavel) {
        this.mensagemResponsavelVigente = responsavel.familiar.pessoasFisica.nome +
                                          ' - Início: ' + this.dateToString(responsavel.dataVinculacao) +
                                          ' - Fim: ' + this.dateToString(responsavel.dataDesvinculacao);

      } else {
        this.mensagemResponsavelVigente = 'Aluno sem responsável vigente no momento.';
      }
    });
  }


  dateToString(data) {
    if (data) {
      const dataFormate = new Date(data);
      return dataFormate.toLocaleDateString();
    }
    return '';
  }
}
