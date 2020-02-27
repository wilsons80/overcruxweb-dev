import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AutenticadorService } from './../../../services/autenticador/autenticador.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { timer, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { LogoutService } from 'src/app/services/logout/logout.service';
import { TempoSessaoService } from 'src/app/services/tempo-sessao/tempo-sessao.service';

@Component({
  selector: 'app-tempo-sessao-dialog',
  templateUrl: './tempo-sessao-dialog.component.html',
  styleUrls: ['./tempo-sessao-dialog.component.css']
})
export class TempoSessaoDialogComponent implements OnInit, OnDestroy {
 

  sessaoExpirada = false;
  tempo:number
  tempoDown: number;

  sub:Subscription;

  constructor( 
    private router:Router,
    private autenticadorService:AutenticadorService,
    public tempoSessaoService:TempoSessaoService,
    private dialogRef: MatDialogRef<TempoSessaoDialogComponent>,
    private logoutService:LogoutService,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit() {

    this.tempoSessaoService.tempoAcabou.subscribe(() => {
      this.sessaoExpirada = true;
      this.logoutService.logout();
    })

  }

  revalidarSessao(){
    this.autenticadorService.refreshToken();
    this.dialogRef.close();
  }

  login(){
    this.router.navigate(['login']);
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

 
}
