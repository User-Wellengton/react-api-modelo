import { Produto } from "../interfaces/Produto/Produto";
import ServiceBase from "./ServiceBase";

class ProdutoService extends ServiceBase<Produto> {
  constructor() {
    super("Produto");
  }

  async excluirProduto(id: string): Promise<void> {
    await this.delete(id);
  }
}

const produtoService = new ProdutoService();
export default produtoService;
