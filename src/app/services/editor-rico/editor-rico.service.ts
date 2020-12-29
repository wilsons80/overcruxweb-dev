import { Injectable } from '@angular/core';
import { EditorPecaDespacho } from 'src/app/core/peca-despacho';
import { PLACEHOLDER_REGEXP } from 'src/app/directives/editor-placeholder-dialog.directive';

@Injectable({
    providedIn: 'root'
})
export class EditorRicoService {

    updatePlaceholder(editor: EditorPecaDespacho, key: string, value: any) {
        if (!(editor.placeholders instanceof Map)) {
            editor.placeholders = new Map();
        }

        editor.placeholders.set(key, value);
    }

    getConteudo(editor: EditorPecaDespacho): string {
        const conteudoSemUndefined = editor.conteudo.replace(/<span style="font-size:undefined">/gi, '<span>');
        let conteudo = conteudoSemUndefined;

        const variaveis = conteudo.match(PLACEHOLDER_REGEXP) || [];
        variaveis.forEach(placeholder => {
            conteudo = conteudo.replace(placeholder, this.getPlaceholderValue(editor, placeholder));
        });

        return conteudo;
    }

    getPlaceholderValue(editor: EditorPecaDespacho, conteudo: string): string {
        const key = conteudo.replace('[[', '').replace(']]', '');
        return editor.placeholders instanceof Map ? editor.placeholders.get(key) + '' : 'Indefinido';
    }

}
