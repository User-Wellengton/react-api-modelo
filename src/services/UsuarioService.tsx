import { Usuario } from "../interfaces/Usuario/Usuario";
import ServiceBase from "./ServiceBase";

class UsuarioService extends ServiceBase<Usuario> {
  constructor() {
    super("Usuario");
  }
}

const usuarioService = new UsuarioService();
export default usuarioService;
