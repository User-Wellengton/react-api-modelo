import { ConfirmDeleteModal } from "../../../interfaces/Produto/ProdutoModalDelete";

const ModalProdutoDelete: React.FC<ConfirmDeleteModal> = ({
  isOpen,
  onClose,
  produto,
  onConfirm,
}) => {
  if (!produto) {
    return null;
  }

  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      tabIndex={-1}
      role="dialog"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar Exclusão</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Tem certeza que deseja excluir o produto {produto.nome}?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProdutoDelete;
