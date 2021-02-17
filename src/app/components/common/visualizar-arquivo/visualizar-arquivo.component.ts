import { Component, OnInit, Input } from '@angular/core';
import { AnexosAcaoService } from 'src/app/services/anexos-acao/anexos-acao.service';
import { LoadingPopupService } from 'src/app/services/loadingPopup/loading-popup.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { FileUtils } from 'src/app/utils/file-utils';
import { VisualizarArquivo } from './visualizar-arquivo';

@Component({
  selector: 'visualizar-arquivo',
  templateUrl: './visualizar-arquivo.component.html',
  styleUrls: ['./visualizar-arquivo.component.css']
})
export class VisualizarArquivoComponent implements OnInit {

  @Input() dados: VisualizarArquivo;

  constructor(private anexosAcaoService: AnexosAcaoService,
              private loadingPopupService: LoadingPopupService,
              private toastService: ToastService,
              private fileUtils: FileUtils) { }

  ngOnInit() { }

  getNomeArquivoURIEncoded() {
    return encodeURIComponent(this.dados.nomeArquivo);
  }

  desabilitar() {
    return !this.dados.idArquivo;
  }

  visualizar() {
   //const url = this.anexosAcaoService.getUrlConteudoArquivo(this.dados.idArquivo, this.getNomeArquivoURIEncoded()) ;
   //window.open(encodeURI(url), '_blank');

   this.showArquivo();
  }
  

  showArquivo() {
    this.loadingPopupService.mostrarMensagemDialog('Abrindo ..');
    this.anexosAcaoService.getConteudoArquivo(this.dados.idArquivo, this.getNomeArquivoURIEncoded())
    .subscribe(
      response => {
        if(this.dados.contentType.includes('pdf') || this.dados.contentType.includes('image')) {
          this.fileUtils.showFile(response, this.dados.nomeArquivo, this.dados.contentType);
        } else {
          this.fileUtils.downloadFile(response, this.dados.nomeArquivo, this.dados.contentType);
        }
      },
      responseError => {
        const dataView = new DataView(responseError.error);
        const decoder = new TextDecoder('utf8');
        const resp = JSON.parse(decoder.decode(dataView));
        this.toastService.showAlerta(resp.mensagem);

      }).add(() => {
        this.loadingPopupService.closeDialog();
      });
  }

}
