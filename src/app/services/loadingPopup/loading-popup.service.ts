import { ToolbarPrincipalService } from 'src/app/services/toolbarPrincipal/toolbar-principal.service';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoadingPopupComponent } from 'src/app/components/common/loading-popup/loading-popup.component';

const dialogConfig = new MatDialogConfig();

@Injectable({
  providedIn: 'root'
})
export class LoadingPopupService {

  dialogRef: MatDialogRef<any,any>;

  constructor(
    public dialog: MatDialog,
    private toolbarPrincipalService:ToolbarPrincipalService
    ) {
  }

  
  mostrarMensagemDialog(texto: string): void {
    if (this.dialogRef !== undefined && this.dialogRef.componentInstance !== null){
      this.changeMassageDialog(texto);
    } else {
      this.openDialog(texto);
    }
  }

  private changeMassageDialog(texto: string): void {
    this.dialogRef.componentInstance.mensagem = texto;
  }

  mostrarDialog(): void {
    this.toolbarPrincipalService.loadingCompleto = false;
  }
  
  closeDialog() {
    this.toolbarPrincipalService.loadingCompleto = true;
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  private openDialog(texto: string): void {
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      mensagem: texto
    };

    this.dialogRef = this.dialog.open(LoadingPopupComponent, dialogConfig);
  }


}
