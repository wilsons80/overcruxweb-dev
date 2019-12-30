export class TipoUnidade {
     tipos = [
        {id: '1', tipo: 'M', descricao: 'MATRIZ'},
        {id: '2', tipo: 'F', descricao: 'FILIAL'}
      ]


    getTipo(tipo: string) {
        const tipoUnidade = this.tipos.find( d => d.tipo.includes(tipo));
        return tipoUnidade ? tipoUnidade : null;
    }

    getDescricao(tipo: string) {
      const tipoUnidade = this.getTipo(tipo);
      return tipoUnidade ? tipoUnidade.descricao : '';
    }
}
