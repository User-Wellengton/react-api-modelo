import { Tarefa } from "./Tarefa";
import { TarefaModal } from "./TarefaModal";

export interface ConfirmDeleteModal extends TarefaModal {
  onConfirm: () => void;
  tarefa?: Tarefa;
  onTarefaCadastrado?: (tarefa: Tarefa) => void;
}
