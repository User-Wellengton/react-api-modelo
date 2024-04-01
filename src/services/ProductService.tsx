import { Produto } from "../interfaces/Produto/Produto";
import ServiceBase from "./ServiceBase";

class ProdutoService extends ServiceBase<Produto> {
  constructor() {
    super("Produto");
  }
}

const produtoService = new ProdutoService();
export default produtoService;
