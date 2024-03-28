import { Produto } from "../interfaces/Produto/Produto";
import ServiceBase from "./ServiceBase";

const ProdutoService = new ServiceBase<Produto>("Produto");

export default ProdutoService;
