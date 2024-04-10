import { Cliente } from "../interfaces/Cliente/Cliente";
import ServiceBase from "./ServiceBase";

class ClienteService extends ServiceBase<Cliente> {
  constructor() {
    super("Cliente");
  }
}

const clienteService = new ClienteService();
export default clienteService;
