import { AfterViewInit, Component, forwardRef, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, NgForm, NgModelGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditorPecaDespacho } from 'src/app/core/peca-despacho';
import { EditorRicoService } from 'src/app/services/editor-rico/editor-rico.service';
import { LoadingPopupService } from 'src/app/services/loadingPopup/loading-popup.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'editor-rico',
  templateUrl: './editor-rico.component.html',
  styleUrls: ['./editor-rico.component.css']
})
export class EditorRicoComponent implements OnInit, AfterViewInit, OnDestroy {

  /*
  @ViewChild('editorRico', { static: true }) ckeditor: any;
  ckeConfig: any;
  @Input() editor: EditorPecaDespacho = { conteudo: '' };
  */
 
  editor: EditorPecaDespacho = new EditorPecaDespacho();

  name = 'ng2-ckeditor';
  ckeConfig: any;
  @ViewChild("myckeditor") ckeditor: any;

  constructor(
    private loadingPopupService: LoadingPopupService,
    private editorRicoService: EditorRicoService,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<EditorRicoComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.editor.conteudo = data.conteudo;
  }

  ngOnInit(): void {
    this.carregarConfiguracoes();
  }

  ngAfterViewInit() {
    
    try {
      this.ckeditor.instance.on('instanceReady', (event) => {
        event.editor.execCommand('justifyblock');
      });
    } catch (e) { }

    this.attachPlaceholderListener();
  }

  private carregarConfiguracoes(): void {
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      extraPlugins: 'divarea,pastefromword,placeholder',
      height : 400,
      width : 900,
      language: 'pt',
      /*
      toolbarGroups: [
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align'] },

        { name: 'links', groups: ['Link', 'Unlink', 'Anchor'] },
        { name: 'insert', groups: ['Table', 'HorizontalRule', 'SpecialChar', 'PageBreak'] },

        { name: 'styles', groups: ['Format', 'Font', 'FontSize'] },
        { name: 'colors', groups: ['TextColor', 'BGColor'] },
        { name: 'tools', groups: ['Maximize'] },
      ],
      */
      title: 'Editor rico',
      //extraPlugins: 'autogrow,divarea,pastefromword,placeholder',
      
      resize_enabled: false,
      tabSpaces: 8,
      
      removePlugins: 'elementspath,language,tableselection,liststyle,tabletools,scayt,menubutton,contextmenu',
      removeButtons: 'Flash,Smiley,PageBreak,Image',

      disableNativeSpellChecker: false,
      
    };
  }


  
  onChange($event: any): void {
  }

  onPaste(event: any): void {
    const regexp = /<p()/g;
    let pastedValue = event.data.dataValue;
    if (!regexp.test(pastedValue)) {
      pastedValue = `<p style="text-align: justify">${pastedValue}</p>`;
    }
    event.data.dataValue = pastedValue.replace(regexp, '<p style="text-align: justify"');
  }


  /*
  visualizarPdf(): void {
    this.loadingPopupService.mostrarMensagemDialog('Gerando arquivo PDF..');

    const formData = new FormData();
    formData.append('conteudo', this.editorRicoService.getConteudo(this.editor));

    this.geradorPdfService.visualizarPdf(formData).subscribe(
      response => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');

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
  */

  ngOnDestroy(): void {
    if(this.ckeditor.paste){
      this.ckeditor.paste.unsubscribe();
    }
  }

  private attachPlaceholderListener() {
    try {
      this.ckeditor.contentDom.subscribe((event) => {
        var editable = event.editor.editable();

        editable.attachListener(editable, 'mouseover', (event) => {
          var isPlaceholder = (event.data.$.target).closest('.cke_placeholder');

          if (isPlaceholder) {
            var placeholder = event.data.$.srcElement.outerText;
            event.data.$.target.setAttribute('title', this.editorRicoService.getPlaceholderValue(this.ckeditor, placeholder));
          }
        });
      });
    }
    catch (e) { }
  }


  cancelar() {
    this.dialogRef.close();
  }

}
