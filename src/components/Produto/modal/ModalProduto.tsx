import React, { useState } from "react";
import { ProdutoModal } from "../../../interfaces/Produto/ProdutoModal";
import { Produto } from "../../../interfaces/Produto/Produto";
import ServiceBase from "../../../services/ServiceBase";
import { toast, Bounce } from "react-toastify";

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
      toast.success("Produto criado com SUCESSO!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      toast.error("Ocorreu um erro ao criar o Produto", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      tabIndex={-1}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Criar Novo Produto</h5>
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

export default ModalProduto;
function recarregarProdutos() {
  throw new Error("Function not implemented.");
}
