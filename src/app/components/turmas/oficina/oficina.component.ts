import { Turmas } from './../../../core/turmas';
import { Component, OnInit, Input, AfterContentChecked, ChangeDetectorRef, forwardRef } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'oficina',
  templateUrl: './oficina.component.html',
  styleUrls: ['./oficina.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: NgForm },
    { provide: ControlContainer, useExisting: forwardRef(() => NgModelGroup) }
   ]
})
export class OficinaComponent implements OnInit, AfterContentChecked {

  @Input() turma: Turmas;

  openFormCadastro = false;

  constructor(protected drc: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngAfterContentChecked(): void {
    this.drc.detectChanges();
  }

  onGetAdicionar(evento) {
    this.openFormCadastro = evento;
  }



}
