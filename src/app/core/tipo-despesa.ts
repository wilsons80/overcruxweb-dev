export class TipoDespesa {

    tipos = [
      {id: 'D', descricao: 'DESPESA'},
      {id: 'R', descricao: 'RECEITA'},
    ];

    getTipo(tipoParam: string) {
        const tipo = this.tipos.find( d => d.id.includes(tipoParam));
        return tipo ? tipo : null;
    }

    getDescricao(tipoParam: string) {
      const tipo = this.getTipo(tipoParam);
      return tipo ? tipo.descricao : '';
    }
}
