import React, { useState } from "react";
import { ProdutoModal } from "../../../interfaces/Produto/ProdutoModal";
import { Produto } from "../../../interfaces/Produto/Produto";
import ServiceBase from "../../../services/ServiceBase";

interface ModalProdutoProps extends ProdutoModal {
  recarregarProdutos: () => void;
}

const ModalProduto: React.FC<ModalProdutoProps> = ({
  isOpen,
  onClose,
  recarregarProdutos,
}) => {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [disponivel, setDisponivel] = useState(true);

  if (!isOpen) return null;

  const limparCampos = () => {
    setNome("");
    setValor("");
    setDisponivel(true);
  };

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const novoProduto: Produto = {
      id: 0,
      nome,
      valor: parseFloat(valor),
      disponivel,
    };
    try {
      const service = new ServiceBase<Produto>("Produto");
      await service.create(novoProduto);
      onClose();
      limparCampos();
      recarregarProdutos();
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  return (
    <div
      className="modal"
      tabIndex={-1}
      role="dialog"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Criar Novo Produto</h5>
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={nome}
                  onChange={handleNomeChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="valor">Valor:</label>
                <input
                  type="text"
                  id="valor"
                  name="valor"
                  value={valor}
                  onChange={handleValorChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="disponivel">Disponível:</label>
                <select
                  name="disponivel"
                  value={disponivel ? "true" : "false"}
                  onChange={handleDisponivelChange}
                >
                  <option value="true">Disponível</option>
                  <option value="false">Indisponível</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Salvar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Fechar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalProduto;
function recarregarProdutos() {
  throw new Error("Function not implemented.");
}
