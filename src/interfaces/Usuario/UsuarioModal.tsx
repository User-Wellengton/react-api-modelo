import { Usuario } from "./Usuario";

export interface UsuarioModal {
  isOpen: boolean;
  onClose: () => void;
  onUsuarioCadastrado?: (usuario: Usuario) => void;
}
