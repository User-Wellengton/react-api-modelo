import { Usuario } from "./Usuario";
import { UsuarioModal } from "./UsuarioModal";

export interface ConfirmDeleteModal extends UsuarioModal {
  onConfirm: () => void;
  usuario?: Usuario;
  onUsuarioCadastrado?: (usuario: Usuario) => void;
}
