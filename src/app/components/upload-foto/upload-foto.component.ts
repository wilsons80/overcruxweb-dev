import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ArquivoUnidadeService } from '../../services/arquivo/arquivo.service';

@Component({
  selector: 'app-upload-foto',
  templateUrl: './upload-foto.component.html',
  styleUrls: ['./upload-foto.component.css']
})
export class UploadFotoComponent implements OnInit {

  nomeArquivo: string;
  file: any;

  constructor(
    private arquivoService: ArquivoUnidadeService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.nomeArquivo = event.target.files.length > 0 ? event.target.files[0].name : null;
    this.file = event.target.files[0];
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.file = event.file;
    this.croppedImage = event.base64;
  }
  imageLoaded() {
  }
  cropperReady() {
  }
  loadImageFailed() {
  }

  salvar() {

    this.arquivoService.gravar(this.file).subscribe(() => {
      this.router.navigate(['home']);
      localStorage.removeItem('logo');
    });
  }

  cancelar() {
    this.router.navigate(['home']);
  }

}
