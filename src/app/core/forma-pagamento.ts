export class FormaPagamento {
    tipos = [
        {id: 'A', descricao: 'CARTÃO DE CRÉDITO' },
        {id: 'B', descricao: 'DÉBITO EM CONTA CORRENTE' },
        {id: 'C', descricao: 'CHEQUE' },
        {id: 'D', descricao: 'EM DINHEIRO' }
     ];


    getTipo(tipo: string) {
       const tipoCargo = this.tipos.find( d => d.id.includes(tipo));
       return tipoCargo ? tipoCargo : null;
     }

     getDescricao(tipo: string) {
      const tipoCargo = this.getTipo(tipo);
      return tipoCargo ? tipoCargo.descricao : '';
    }
}
