import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorToastComponent } from 'src/app/components/common/http-error-toast/http-error-toast.component';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _snackBar: MatSnackBar) { }

  showAlerta(mensagem: string, id?: number) {
    this.showToast(mensagem, 5000, id);
  }

  showSucesso(mensagem: string) {
    this.showToast(mensagem, 5000);
  }

  private showToast(mensagem: string, duracao: number, id?: number) {
    this._snackBar.openFromComponent(HttpErrorToastComponent, {
      duration: duracao,
      horizontalPosition: 'left',
      data: { mensagem, id },
    });
  }

}
