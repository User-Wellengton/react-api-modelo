import React, { useState } from "react";
import { UsuarioModal } from "../../../interfaces/Usuario/UsuarioModal";
import { Usuario } from "../../../interfaces/Usuario/Usuario";
import ServiceBase from "../../../services/ServiceBase";
import { toast, Bounce } from "react-toastify";

interface ModalUsuarioProps extends UsuarioModal {
  recarregarUsuarios: () => void;
}

const ModalUsuario: React.FC<ModalUsuarioProps> = ({
  isOpen,
  onClose,
  recarregarUsuarios,
}) => {
  const [id, setId] = useState<number | undefined>(undefined);
  const [nome, setNome] = useState(""); 
  const [email, setEmail] = useState("");
  

  if (!isOpen) return null;

  const limparCampos = () => {
    setNome("");
    setNome("");    
    setEmail("");    
  };

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  
  const validarUsuario = (usuario: Usuario) => {
    const { nome,  email } = usuario;
    if (!nome ||  !email) {
      throw new Error("Todos os campos devem ser preenchidos");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const novoUsuario: Usuario = {
      id: 0,
      nome,      
      email,      
    };
    try {
      validarUsuario(novoUsuario);
      const service = new ServiceBase<Usuario>("Usuario");
      await service.create(novoUsuario);
      onClose();
      limparCampos();
      recarregarUsuarios();
      toast.success("Usuario criado com SUCESSO!", {
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
      console.error("Erro ao cadastrar usuário:", error);
      toast.error("Ocorreu um erro ao criar o usuário", {
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
            <h5 className="modal-title">Criar Novo Usuario</h5>
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

export default ModalUsuario;
