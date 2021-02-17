import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { from } from 'rxjs';
import { concatMap, finalize} from 'rxjs/operators';
import { AnexosAcaoPlanejamento } from 'src/app/core/anexos-acao-planejamento';
import { ArquivoMetadados } from 'src/app/core/arquivo-metadado';
import { AnexosAcaoService } from 'src/app/services/anexos-acao/anexos-acao.service';
import { AnexosService } from 'src/app/services/anexos/anexos.service';
import { LoadingPopupService } from 'src/app/services/loadingPopup/loading-popup.service';
import { UploaderService } from 'src/app/services/uploader/uploader.service';
import { VisualizarArquivo } from '../visualizar-arquivo/visualizar-arquivo';

@Component({
  selector: 'anexos',
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: NgForm },
    { provide: ControlContainer, useExisting: forwardRef(() => NgModelGroup) }
  ]
})
export class AnexosComponent implements OnInit {

  @Input() dadostela: any;

  arquivos: any = {};
  progress: any;

  somaAnexos = 0;
  somaMaximaAnexos: number = 100 * 1024 * 1024;
  tamanhoMaximoDescricao = 200;

  colunasVisiveis: Array<string> = [
    'descricao',
    'extensao',
    'tamanho',
    'visualizar',
    'alterar',
    'excluir',
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private uploaderService: UploaderService,
    private anexoService: AnexosService,
    private dialog: MatDialog,
    private anexosAcaoService: AnexosAcaoService,
    private loadingPopupService: LoadingPopupService,
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.dadostela.anexos);
    this.dataSource.connect();
    this.atualizarTamanhoAnexos();
  }

  atualizarTamanhoAnexos() {
    this.somaAnexos = 0;
    if (_.isEmpty(this.dadostela.anexos)) return;
    this.dadostela.anexos.forEach(element => {
      this.somaAnexos += element.metadados.nrTamanhoArquivo;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["dadostela"] && this.dadostela.anexos && this.dadostela.anexos.length) {
      this.dataSource = new MatTableDataSource(this.dadostela.anexos);
      this.atualizarTamanhoAnexos();
    }
  }

  selecionarAnexos(files) {
    this.loadingPopupService.mostrarMensagemDialog('Anexando...');

    from(files)
      .pipe(
        concatMap((f: File) =>this.anexosAcaoService.gravar(f)),
        finalize(() => this.loadingPopupService.closeDialog())
      )
      .subscribe((metadadoAnexo: ArquivoMetadados) => {
        this.dadostela.anexos.push(this.build(metadadoAnexo));
        this.somaAnexos += metadadoAnexo.nrTamanhoArquivo;
        this.dataSource.data = this.dadostela.anexos;
        this.isTamanhoMaximoAnexoExcedido();
      });
  }

  private build(metadadoAnexo: ArquivoMetadados) {
    let anexo: any = {};
    anexo.metadados = metadadoAnexo;
    return anexo;
  }

  alterarAnexo(file: File, indiceAnexo: number) {
    this.loadingPopupService.mostrarMensagemDialog('Alterando arquivo...');

    this.anexosAcaoService.gravar(file)
      .pipe(finalize(() => this.loadingPopupService.closeDialog()))
      .subscribe((novoAnexo: ArquivoMetadados) => {
        this.somaAnexos -= this.dadostela.anexos[indiceAnexo].metadados.nrTamanhoArquivo;
        this.somaAnexos += novoAnexo.nrTamanhoArquivo;

        this.dadostela.anexos[indiceAnexo].metadados = novoAnexo;
        this.dataSource.data = this.dadostela.anexos;
        this.isTamanhoMaximoAnexoExcedido();
      });
  }

  exibirTamanhoAnexos() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    this.dialog.open(AnexosTamanhosPermitidosComponent, dialogConfig);
  }
  
  isTamanhoMaximoAnexoExcedido() {
    this.dadostela.tamanhoMaximoAnexoExcedido = this.somaAnexos > this.somaMaximaAnexos;
    return this.dadostela.tamanhoMaximoAnexoExcedido;
  }

  excluirTodos() {
    this.dadostela.anexos = [];
    this.dataSource.data = this.dadostela.anexos;
    this.somaAnexos = 0;
    this.isTamanhoMaximoAnexoExcedido();
  }  

  excluirAnexo(anexo) {
    this.dadostela.anexos = this.dadostela.anexos.filter(a => a !== anexo);
    this.dataSource.data = this.dadostela.anexos;
    this.somaAnexos -= anexo.metadados.nrTamanhoArquivo;
    this.isTamanhoMaximoAnexoExcedido();
  }

  getExtensoesPermitidasAnexos(): string {
    return this.anexoService.getExtensoesPermitidasAnexos();
  }

  getArquivoMinuta(anexo): VisualizarArquivo {
    const arquivo = {
      idArquivo: anexo.metadados.id,
      nomeArquivo: anexo.metadados.nmArquivo,
      contentType:  anexo.metadados.dsTipoArquivo,
      path: ''
    };
    return arquivo;
  }

}

@Component({
  selector: 'anexos-tamanhos-permitidos',
  templateUrl: 'anexos-tamanhos-permitidos.html',
  styleUrls: ['./anexos.component.css']
})
export class AnexosTamanhosPermitidosComponent {

  constructor(public dialogRef: MatDialogRef<AnexosTamanhosPermitidosComponent>) {
  }

  fechar(): void {
    this.dialogRef.close();
  }

}
