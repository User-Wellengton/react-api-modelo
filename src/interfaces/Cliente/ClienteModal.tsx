import { Cliente } from "./Cliente";

export interface ClienteModal {
  isOpen: boolean;
  onClose: () => void;
  onClienteCadastrado?: (cliente: Cliente) => void;
}
