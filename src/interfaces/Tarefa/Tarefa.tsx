export interface Tarefa {
  id: number;
  nomeProjeto: string;
  nomeTarefa: string;
  descricao: string;
  dataInicial: Date;
  DataEntrega: Date;
  prioridade: number;
  status: number;
}
