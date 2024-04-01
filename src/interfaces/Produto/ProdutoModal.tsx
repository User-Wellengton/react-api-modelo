import { Produto } from "./Produto";

export interface ProdutoModal {
  isOpen: boolean;
  onClose: () => void;
  onProdutoCadastrado?: (produto: Produto) => void;
}

export interface ConfirmDeleteModal extends ProdutoModal {
  onConfirm: () => void;
  produto?: Produto;
  onProdutoCadastrado?: (produto: Produto) => void;
}
