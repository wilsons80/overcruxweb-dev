export class TipoTurno {
    tipos: any = [
      { id: 'M', descricao: 'MATUTINO' },
      { id: 'V', descricao: 'VESPERTINO' },
      { id: 'N', descricao: 'NOTURNO' },
      { id: 'O', descricao: 'OUTRO' },
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
