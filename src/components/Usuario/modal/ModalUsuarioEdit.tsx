import React, { useState, useEffect } from "react";
import { Usuario } from "../../../interfaces/Usuario/Usuario";

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
  

  useEffect(() => {
    if (usuario) {
      setId(usuario.id);
      setNome(usuario.nome);      
      setEmail(usuario.email);      
    }
  }, [usuario]);

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
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
            <h5 className="modal-title">Editar Usuario</h5>
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

export default ModalUsuarioEdit;
