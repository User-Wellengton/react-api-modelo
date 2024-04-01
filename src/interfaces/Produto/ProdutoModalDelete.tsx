import { Produto } from "./Produto";
import { ProdutoModal } from "./ProdutoModal";

export interface ConfirmDeleteModal extends ProdutoModal {
  onConfirm: () => void;
  produto?: Produto;
  onProdutoCadastrado?: (produto: Produto) => void;
}
