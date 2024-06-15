import { Tarefa } from "./Tarefa";

export interface TarefaModal {
  isOpen: boolean;
  onClose: () => void;
  onTarefaCadastrado?: (tarefa: Tarefa) => void;
}
