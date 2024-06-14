import React, { useState } from "react";
import { ClienteModal } from "../../../interfaces/Cliente/ClienteModal";
import { Cliente } from "../../../interfaces/Cliente/Cliente";
import ServiceBase from "../../../services/ServiceBase";
import { toast, Bounce } from "react-toastify";

interface ModalClienteProps extends ClienteModal {
  recarregarClientes: () => void;
}

const ModalCliente: React.FC<ModalClienteProps> = ({
  isOpen,
  onClose,
  recarregarClientes,
}) => {
  const [id, setId] = useState<number | undefined>(undefined);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [ativo, setAtivo] = useState(false);

  if (!isOpen) return null;

  const limparCampos = () => {
    setNome("");
    setNome("");
    setSobrenome("");
    setEmail("");
    setAtivo(true);
  };

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const handleSobrenomeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSobrenome(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleAtivoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAtivo(event.target.value === "true");
  };

  const validarCliente = (cliente: Cliente) => {
    const { nome, sobrenome, email, ativo } = cliente;
    if (!nome || !sobrenome || !email || ativo === null) {
      throw new Error("Todos os campos devem ser preenchidos");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const novoCliente: Cliente = {
      id: 0,
      nome,
      sobrenome,
      email,
      ativo,
    };
    try {
      validarCliente(novoCliente);
      const service = new ServiceBase<Cliente>("Cliente");
      await service.create(novoCliente);
      onClose();
      limparCampos();
      recarregarClientes();
      toast.success("Cliente criado com SUCESSO!", {
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
      console.error("Erro ao cadastrar cliente:", error);
      toast.error("Ocorreu um erro ao criar o Cliente", {
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
            <h5 className="modal-title">Criar Novo Cliente</h5>
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
                <label htmlFor="sobrenome" className="form-label">
                  Sobrenome:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sobrenome"
                  value={sobrenome}
                  onChange={handleSobrenomeChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ativo" className="form-label">
                  Ativo:
                </label>
                <select
                  className="form-select"
                  id="ativo"
                  value={ativo ? "true" : "false"}
                  onChange={handleAtivoChange}
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
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

export default ModalCliente;
