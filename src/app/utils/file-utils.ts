import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})

export class FileUtils {

    imageBlobUrl: any;

    constructor(private domSanitizer: DomSanitizer) {

    }

    convertBufferArrayToBase64(bufferArry: any) {
         let TYPED_ARRAY = new Uint8Array(bufferArry);

        let base64String = btoa(new Uint8Array(TYPED_ARRAY).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, ''));
        
        return this.domSanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64,` + base64String);
    }


    /**
     * Recebe um byte[] e faz o download do arquivo em excel
     * @param dados 
     */
    downloadFile(dados) {
        const blob = new Blob([dados], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url= window.URL.createObjectURL(blob);
        var anchor = document.createElement("a");
        anchor.download = "conciliacao.xlsx";
        anchor.href = url;
        anchor.click();
    }
}

