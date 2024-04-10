import React, { useState, useEffect } from "react";
import { Cliente } from "../../../interfaces/Cliente/Cliente";

interface ModalClienteEditProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: Cliente | null;
  onClienteEditado: (cliente: Cliente) => void;
}

const ModalClienteEdit: React.FC<ModalClienteEditProps> = ({
  isOpen,
  onClose,
  cliente,
  onClienteEditado,
}) => {
  const [id, setId] = useState<number | undefined>(undefined);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    if (cliente) {
      setId(cliente.id);
      setNome(cliente.nome);
      setSobrenome(cliente.sobrenome);
      setEmail(cliente.email);
      setAtivo(cliente.ativo);
    }
  }, [cliente]);

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (cliente) {
      const clienteEditado: Cliente = {
        ...cliente,
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        ativo: ativo,
      };
      onClienteEditado(clienteEditado);
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
            <h5 className="modal-title">Editar Cliente</h5>
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
                <label htmlFor="disponivel" className="form-label">
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

export default ModalClienteEdit;
