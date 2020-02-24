export class TipoMovimentacao {

    tipos = [
      {id: 'E', descricao: 'ENTRADA'},
      {id: 'S', descricao: 'SAÍDA'},
      {id: 'A', descricao: 'ACERTO ESTOQUE'}
    ]

    getTipo(tipoParam: string) {
        const tipo = this.tipos.find( d => d.id.includes(tipoParam));
        return tipo ? tipo : null;
    }

    getDescricao(tipoParam: string) {
      const tipo = this.getTipo(tipoParam);
      return tipo ? tipo.descricao : '';
    }
}
