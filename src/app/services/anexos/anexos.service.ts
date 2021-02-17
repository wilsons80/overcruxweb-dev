import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploaderService } from '../uploader/uploader.service';

@Injectable({
  providedIn: 'root'
})
export class AnexosService {

  constructor(
    private uploaderService: UploaderService
  ) { }

  validaPropriedades$(file): Observable<boolean> {
    const extensao = this.uploaderService.getExtensaoFile(file);
    if (!this.uploaderService.isAceito(extensao)) {
      file.motivo = 'Tipo de arquivo não permitido: "' + extensao + '"';
      return of(false);
    }

    if (!this.uploaderService.isValidSize(file)) {
      const tamanhoArquivo = Number((file.size / (1024 * 1024)).toFixed(1));
      file.motivo = 'O tamanho do arquivo é maior que o permitido (' + tamanhoArquivo + ' Mb).';
      return of(false);
    }

    return of(true);
  }

  verificaPermissao(file): Observable<any> {
    return new Observable((observer) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (() => {
        observer.next(file);
        observer.complete();
      });

      fileReader.onerror = ((err) => {
        file.motivo = 'Você precisa de permissão para acessar o arquivo.';
        observer.error(file);
      });
    });
  }

  getExtensoesPermitidasAnexos(): string {
    return this.uploaderService.getExtensoesPermitidas();
  }

  verificarArquivosDuplicados(anexos): boolean {
    let arquivosSelecionadosTemp = [];

    arquivosSelecionadosTemp = _.cloneDeep(anexos);

    arquivosSelecionadosTemp = arquivosSelecionadosTemp.sort(function (a, b) {
      if (a.descricao.concat(a.extensaoArquivo) < b.descricao.concat(b.extensaoArquivo)) { return -1; }
      if (a.descricao.concat(a.extensaoArquivo) > b.descricao.concat(b.extensaoArquivo)) { return 1; }
      return 0;
    });

    for (let indice = 0; arquivosSelecionadosTemp.length - 2 >= indice; indice++) {
      if (arquivosSelecionadosTemp[indice].descricao === arquivosSelecionadosTemp[indice + 1].descricao) {
        return true;
      }
    }

    return false;
  };

}
