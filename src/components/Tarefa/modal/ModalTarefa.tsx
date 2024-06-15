import React, { useState } from "react";
import { TarefaModal } from "../../../interfaces/Tarefa/TarefaModal";
import { Tarefa } from "../../../interfaces/Tarefa/Tarefa";
import ServiceBase from "../../../services/ServiceBase";
import { toast, Bounce } from "react-toastify";

interface ModalTarefaProps extends TarefaModal {
  recarregarTarefas: () => void;
}

const ModalTarefa: React.FC<ModalTarefaProps> = ({
  isOpen,
  onClose,
  recarregarTarefas,
}) => {
  const [nomeProjeto, setNomeProjeto] = useState("");
  const [nomeTarefa, setNomeTarefa] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [status, setStatus] = useState("");

  if (!isOpen) return null;

  const limparCampos = () => {
    setNomeProjeto("");
    setNomeTarefa("");
    setPrioridade("");
    setStatus("");
  };

  const handleNomeProjetoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNomeProjeto(event.target.value);
  };

  const handleNomeTarefaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNomeTarefa(event.target.value);
  };

  const handlePrioridadeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPrioridade(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const validarTarefa = (tarefa: Tarefa) => {
    const { nomeProjeto, nomeTarefa, prioridade, status } = tarefa;
    if (!nomeProjeto || nomeTarefa || prioridade === null || status === null) {
      throw new Error("Todos os campos devem ser preenchidos");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const novaTarefa: Tarefa = {
      id: 0,
      nomeProjeto,
      nomeTarefa,
      prioridade: parseFloat(prioridade),
      status: parseFloat(status),
    };
    try {
      validarTarefa(novaTarefa);
      const service = new ServiceBase<Tarefa>("Tarefa");
      await service.create(novaTarefa);
      onClose();
      limparCampos();
      recarregarTarefas();
      toast.success("Tarefa criada com SUCESSO!", {
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
      console.error("Erro ao cadastrar Tarefa:", error);
      toast.error("Ocorreu um erro ao criar a Tarefa", {
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
            <h5 className="modal-title">Criar Nova Tarefa</h5>
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
                <label htmlFor="nomeProjeto" className="form-label">
                  Nome Projeto:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nomeProjeto"
                  value={nomeProjeto}
                  onChange={handleNomeProjetoChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="nomeTarefa" className="form-label">
                  Nome Tarefa:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nomeTarefa"
                  value={nomeTarefa}
                  onChange={handleNomeTarefaChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="prioridade" className="form-label">
                  Príoridade:
                </label>
                <select
                  className="form-select"
                  id="disponivel"
                  value={prioridade}
                  onChange={handlePrioridadeChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status:
                </label>
                <select
                  className="form-select"
                  id="disponivel"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <option value="0">Em Progresso</option>
                  <option value="1">Bloqueado</option>
                  <option value="3">Completo</option>
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

export default ModalTarefa;
