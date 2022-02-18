export class Financeiro {
  id: number;
  nome: string;
  descricao: string;
  tipo: string;
  empresa: string;

  constructor(id: number, nome: string, descricao: string, tipo: string, empresa: string) {
      this.id = id;
      this.nome = nome;
      this.descricao = descricao;
      this.tipo = tipo;
      this.empresa = empresa;
  }
}
