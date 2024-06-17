export interface Tarefa {
  id: number;
  nomeProjeto: string;
  nomeTarefa: string;
  descricao: string;
  dataInicial: Date;
  dataEntrega: Date;
  prioridade: number;
  status: number;
  usuarioId: number;
}
