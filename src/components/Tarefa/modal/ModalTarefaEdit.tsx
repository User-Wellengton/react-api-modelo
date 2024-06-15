import React, { useState, useEffect } from "react";
import { Produto } from "../../../interfaces/Produto/Produto";

interface ModalProdutoEditProps {
  isOpen: boolean;
  onClose: () => void;
  produto: Produto | null;
  onProdutoEditado: (produto: Produto) => void;
}

const ModalProdutoEdit: React.FC<ModalProdutoEditProps> = ({
  isOpen,
  onClose,
  produto,
  onProdutoEditado,
}) => {
  const [id, setId] = useState<number | undefined>(undefined);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [disponivel, setDisponivel] = useState(false);

  useEffect(() => {
    if (produto) {
      setId(produto.id);
      setNome(produto.nome);
      setValor(produto.valor.toString());
      setDisponivel(produto.disponivel);
    }
  }, [produto]);

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleValorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValor(event.target.value);
  };

  const handleDisponivelChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisponivel(event.target.value === "true");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (produto) {
      const produtoEditado: Produto = {
        ...produto,
        nome: nome,
        valor: parseFloat(valor),
        disponivel: disponivel,
      };
      onProdutoEditado(produtoEditado);
    }
  };

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
            <h5 className="modal-title">Editar Produto</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="id" className="form-label">
                  ID:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  value={id}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="nome" className="form-label">
                  Nome:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={nome}
                  onChange={handleNomeChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="valor" className="form-label">
                  Valor:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="valor"
                  value={valor}
                  onChange={handleValorChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="disponivel" className="form-label">
                  Disponível:
                </label>
                <select
                  className="form-select"
                  id="disponivel"
                  value={disponivel ? "true" : "false"}
                  onChange={handleDisponivelChange}
                >
                  <option value="true">Disponível</option>
                  <option value="false">Indisponível</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Fechar
                </button>
                <button type="submit" className="btn btn-primary">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProdutoEdit;
