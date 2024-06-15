import { Tarefa } from "../interfaces/Tarefa/Tarefa";
import ServiceBase from "./ServiceBase";

class TarefaService extends ServiceBase<Tarefa> {
  constructor() {
    super("Tarefa");
  }
}

const tarefaService = new TarefaService();
export default tarefaService;
