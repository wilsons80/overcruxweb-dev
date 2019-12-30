export class TipoFuncionario {
     tipos = [
        {tipo: 'D', descricao: 'Candidato a vaga de funcionário'},
        {tipo: 'C', descricao: 'Colaborador'},
        {tipo: 'E', descricao: 'Estagiário'},
        {tipo: 'F', descricao: 'Funcionário'},
        {tipo: 'I', descricao: 'Instrutor'},
        {tipo: 'V', descricao: 'Voluntário'},
      ]


    getTipo(tipo: string) {
        const tipoFuncionario = this.tipos.find( d => d.tipo.includes(tipo));
        return tipoFuncionario ? tipoFuncionario : null;
    }

    getDescricao(tipo: string) {
      const tipoFuncionario = this.getTipo(tipo);
      return tipoFuncionario ? tipoFuncionario.descricao : '';
    }
}
