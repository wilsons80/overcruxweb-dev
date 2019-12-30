export class SituacaoParentesco {
    situacao: any[] = [
      {tipo: 'ESTREMECIDO', flag: 'E'},
      {tipo: 'INTERROMPIDO', flag: 'I'},
      {tipo: 'INEXISTENTE', flag: 'X'},
   ];

   getSituacaoParentesco(flag: string) {
      const situacao = this.situacao.find( d => d.flag.includes(flag));
      return situacao ? situacao.tipo : null;
    }
}
