export class TipoQuestionario {

    tipos = [
      {id: 1, tipo: 'T', descricao: 'TALENTO' },
      {id: 2, tipo: 'G', descricao: 'GRUPO FAMILIAR' },
      {id: 3, tipo: 'O', descricao: 'OUTRO' },
    ]


    getTipo(tipoParam: string) {
        const tipo = this.tipos.find( d => d.tipo.includes(tipoParam));
        return tipo ? tipo : null;
    }

    getDescricao(tipoParam: string) {
      const tipo = this.getTipo(tipoParam);
      return tipo ? tipo.descricao : '';
    }
}
