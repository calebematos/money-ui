export class Categoria {
  codigo: number;
  nome: string;
}

export class Pessoa {
  codigo: number;
  nome: string;
  ativo = true;
  endereco = new Endereco();
}

export class Endereco {
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Lancamento {
  tipo = 'RECEITA';
  codigo: number;
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  categoria = new Categoria();
  pessoa = new Pessoa();
}
