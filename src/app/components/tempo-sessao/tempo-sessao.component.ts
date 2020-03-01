import { AutenticadorService } from './../../services/autenticador/autenticador.service';
import { TempoSessaoService } from './../../services/tempo-sessao/tempo-sessao.service';
import { TempoSessaoModule } from './tempo-sessao.module';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Observable, timer, Subscription } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TempoSessaoDialogComponent } from '../common/tempo-sessao-dialog/tempo-sessao-dialog.component';

@Component({
  selector: 'tempo-sessao',
  templateUrl: './tempo-sessao.component.html',
  styleUrls: ['./tempo-sessao.component.css']
})
export class TempoSessaoComponent implements OnInit, OnDestroy {

  countDown;
  tick = 1000;
  sub: Subscription;

  constructor(private tempoSessaoService: TempoSessaoService,
              private autenticadorService: AutenticadorService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.sub = this.autenticadorService.tempoSessao$.pipe(
      switchMap((info: any) => {
        this.tempoSessaoService.tempoSessao = info.valor * 60;
        return timer(0, 1000).pipe(
          take(this.tempoSessaoService.tempoSessao),
          map(() => --this.tempoSessaoService.tempoSessao));
      })
    ).subscribe((info) => {
        this.countDown = info;
        if (info === 30) {
          this.openDialog();
        }

        if (info === 0) {
          this.tempoSessaoService.tempoAcabou.emit();
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TempoSessaoDialogComponent, {
      width: '350px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }
}
