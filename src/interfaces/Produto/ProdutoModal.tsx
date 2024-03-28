import { Produto } from "./Produto";

export interface ProdutoModal {
  isOpen: boolean;
  onClose: () => void;
  onProdutoCadastrado: (produto: Produto) => void;
}
