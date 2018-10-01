export class Categoria {
  codigo: number;
  nome: string;
}

export class Pessoa {
  codigo: number;
  nome: string;
  ativo = true;
  endereco = new Endereco();
  contatos = new Array<Contato>();
}

export class Contato {
  codigo: number;
  nome: string;
  email: string;
  telefone: string;
}

export class Endereco {
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  cidade = new Cidade();
}

export class Cidade {
  codigo: number;
  nome: string;
  estado = new Estado();
}

export class Estado {
  codigo: number;
  nome: string;
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
