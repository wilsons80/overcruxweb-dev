export class TipoCargo {
  tipos = [
     {tipo: 'F', descricao: 'Funcionário'},
     {tipo: 'V', descricao: 'Voluntário'},
     {tipo: 'E', descricao: 'Estagiário'}
   ]


  getTipo(tipo: string) {
     const tipoCargo = this.tipos.find( d => d.tipo.includes(tipo));
     return tipoCargo ? tipoCargo : null;
   }


   getDescricao(tipo: string) {
    const tipoCargo = this.getTipo(tipo)
    return tipoCargo ? tipoCargo.descricao : '';
  }
}
