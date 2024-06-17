import React, { useState, useEffect, useCallback } from "react";
import { Tarefa } from "../../../interfaces/Tarefa/Tarefa";
import { toast } from "react-toastify";
import { Cliente } from "../../../interfaces/Cliente/Cliente";
import clienteService from "../../../services/ClienteService";

interface ModalTarefaEditProps {
  isOpen: boolean;
  onClose: () => void;
  tarefa: Tarefa | null;
  onTarefaEditado: (tarefa: Tarefa) => void;
}

const ModalTarefaEdit: React.FC<ModalTarefaEditProps> = ({
  isOpen,
  onClose,
  tarefa,
  onTarefaEditado,
}) => {
  const [id, setId] = useState<number | undefined>(undefined);
  const [nomeProjeto, setNomeProjeto] = useState("");
  const [nomeTarefa, setNomeTarefa] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [status, setStatus] = useState("");
  const [usuarios, setUsuarios] = useState<Cliente[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<string>("");

  const recarregarUsuario = useCallback(async () => {
    try {
      const usuarios = await clienteService.getAll();
      setUsuarios(usuarios);
    } catch (error) {
      console.error("Erro ao buscar usúarios:", error);
    }
  }, []);

  useEffect(() => {
    if (tarefa) {
      setId(tarefa.id);
      setNomeProjeto(tarefa.nomeProjeto);
      setNomeTarefa(tarefa.nomeTarefa);
      setDataInicial(tarefa.dataInicial.toString().substring(0, 10));
      setDataEntrega(tarefa.dataEntrega.toString().substring(0, 10));
      setPrioridade(tarefa.prioridade.toString());
      setStatus(tarefa.status.toString());
      setDescricao(tarefa.descricao);
      setUsuarioSelecionado(tarefa.usuarioId.toString());
    }
    if (isOpen) {
      recarregarUsuario();
    }
  }, [tarefa]);

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

  const handleDataInicialChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDataInicial(event.target.value);
  };

  const handleDataEntregaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDataEntrega(event.target.value);
  };

  const handleDescricaoChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescricao(event.target.value);
  };

  const handlePrioridadeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPrioridade(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const handleUsuarioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUsuarioSelecionado(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const dataIni = new Date(dataInicial);
    const dataEnt = new Date(dataEntrega);

    if (dataEnt < dataIni) {
      toast.error("A data de entrega não pode ser anterior à data de início.");
      return;
    }

    if (tarefa) {
      const tarefaEditada: Tarefa = {
        ...tarefa,
        nomeProjeto: nomeProjeto,
        nomeTarefa: nomeTarefa,
        dataInicial: dataIni,
        dataEntrega: dataEnt,
        prioridade: parseFloat(prioridade),
        status: parseFloat(status),
        descricao: descricao,
        usuarioId: usuarioSelecionado ? parseInt(usuarioSelecionado, 10) : 1,
      };
      onTarefaEditado(tarefaEditada);
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
            <h5 className="modal-title">Editar Tarefa</h5>
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

              <div className="mb-3 d-flex justify-content-between">
                <div className="flex-fill mr-1">
                  <label htmlFor="dataInicial" className="form-label">
                    Data Inicial:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dataInicial"
                    name="dataInicial"
                    value={dataInicial}
                    onChange={handleDataInicialChange}
                  />
                </div>
                <div className="flex-fill ml-1">
                  <label htmlFor="dataEntrega" className="form-label">
                    Data de Entrega:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dataEntrega"
                    name="dataEntrega"
                    value={dataEntrega}
                    onChange={handleDataEntregaChange}
                  />
                </div>
              </div>

              <div className="mb-3 d-flex justify-content-between">
                <div className="flex-fill mr-1">
                  <label htmlFor="prioridade" className="form-label">
                    Príoridade:
                  </label>
                  <select
                    className="form-select"
                    id="prioridade"
                    value={prioridade}
                    onChange={handlePrioridadeChange}
                  >
                    <option>Escolha uma opção</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>

                <div className="flex-fill ml-1">
                  <label htmlFor="status" className="form-label">
                    Status:
                  </label>
                  <select
                    className="form-select"
                    id="status"
                    value={status}
                    onChange={handleStatusChange}
                  >
                    <option>Escolha uma opção</option>
                    <option value="1">To Do</option>
                    <option value="2">Em Progresso</option>
                    <option value="3">Bloqueado</option>
                    <option value="4">Completo</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="descricao" className="form-label">
                  Descrição:
                </label>
                <textarea
                  className="form-control"
                  id="descricao"
                  value={descricao}
                  onChange={handleDescricaoChange}
                  rows={8}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="usuarioId" className="form-label">
                  Usuário:
                </label>
                <select
                  className="form-control"
                  id="usuarioId"
                  value={usuarioSelecionado}
                  onChange={handleUsuarioChange}
                  disabled={!usuarios.length}
                >
                  {usuarios.length ? (
                    usuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.nome} {usuario.sobrenome}
                      </option>
                    ))
                  ) : (
                    <option value="0">Nenhum usuario disponível</option>
                  )}
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

export default ModalTarefaEdit;
