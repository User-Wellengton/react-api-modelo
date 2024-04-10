import { Cliente } from "./Cliente";
import { ClienteModal } from "./ClienteModal";

export interface ConfirmDeleteModal extends ClienteModal {
  onConfirm: () => void;
  cliente?: Cliente;
  onClienteCadastrado?: (cliente: Cliente) => void;
}
