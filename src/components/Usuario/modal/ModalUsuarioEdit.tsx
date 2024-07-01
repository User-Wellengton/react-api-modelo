import React, { useState, useEffect } from "react";
import { Usuario } from "../../../interfaces/Usuario/Usuario";
import { toast, ToastContainer } from "react-toastify";

interface ModalUsuarioEditProps {
  isOpen: boolean;
  onClose: () => void;
  usuario: Usuario | null;
  onUsuarioEditado: (usuario: Usuario) => void;
}

const ModalUsuarioEdit: React.FC<ModalUsuarioEditProps> = ({
  isOpen,
  onClose,
  usuario,
  onUsuarioEditado,
}) => {
  const [id, setId] = useState<number | undefined>(undefined);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editavel, setEditavel] = useState(false); // estado para controlar se os campos estão editáveis

  useEffect(() => {
    if (usuario) {
      setId(usuario.id);
      setNome(usuario.nome);
      setEmail(usuario.email);
    }
  }, [usuario]);

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editavel) {
      setNome(event.target.value);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editavel) {
      setEmail(event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (usuario) {
      const usuarioEditado: Usuario = {
        ...usuario,
        nome: nome,
        email: email,
      };
      onUsuarioEditado(usuarioEditado);
    }
  };

  const handleEditar = () => {
    setEditavel(!editavel); // alterna o modo de edição
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
            <h5 className="modal-title">Editar Usuário</h5>
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
                  readOnly={!editavel}
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
                  readOnly={!editavel}
                />
              </div>

              <div className="modal-footer">
                {!editavel ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEditar}
                  >
                    Editar
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleEditar}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Salvar
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Fechar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUsuarioEdit;
