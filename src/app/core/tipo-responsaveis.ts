export class TipoResponsaveis {
    tipos: any[] = [
        {tipo: 'FINANCEIRO', flag: 'F'},
        {tipo: 'PEDAGOGICO', flag: 'P'},
        {tipo: 'A_AMBOS', flag: 'A'},
     ];

     getTipoResponsavel(flag: string) {
        const tipo = this.tipos.find( d => d.flag.includes(flag));
        return tipo ? tipo.tipo : null;
      }
  
}

