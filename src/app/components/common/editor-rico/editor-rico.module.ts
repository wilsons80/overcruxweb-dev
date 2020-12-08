import { CKEditorModule } from 'ng2-ckeditor';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { EditorRicoComponent } from './editor-rico.component';
import { SharedDirectivesModule } from 'src/app/directives/shared-directives.module';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    EditorRicoComponent
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    SharedDirectivesModule,
    MatToolbarModule
  ],
  exports: [
    EditorRicoComponent
  ],
})
export class EditorRicoModule { }
