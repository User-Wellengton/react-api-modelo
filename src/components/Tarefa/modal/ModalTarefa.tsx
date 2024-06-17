import React, { useCallback, useEffect, useState } from "react";
import { TarefaModal } from "../../../interfaces/Tarefa/TarefaModal";
import { Tarefa } from "../../../interfaces/Tarefa/Tarefa";
import ServiceBase from "../../../services/ServiceBase";
import { toast, Bounce } from "react-toastify";
import { Cliente } from "../../../interfaces/Cliente/Cliente";
import clienteService from "../../../services/ClienteService";

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
  const [descricao, setDescricao] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [status, setStatus] = useState("");
  const [usuarios, setUsuarios] = useState<Cliente[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");

  const recarregarUsuario = useCallback(async () => {
    try {
      const usuarios = await clienteService.getAll();
      setUsuarios(usuarios);
    } catch (error) {
      console.error("Erro ao buscar usúarios:", error);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      recarregarUsuario();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const limparCampos = () => {
    setNomeProjeto("");
    setNomeTarefa("");
    setDescricao("");
    setDataInicial("");
    setDataEntrega("");
    setPrioridade("");
    setStatus("");
    setUsuarioSelecionado("");
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

  const validarTarefa = (tarefa: Tarefa) => {
    const {
      nomeProjeto,
      nomeTarefa,
      dataInicial,
      dataEntrega,
      prioridade,
      status,
      descricao,
      usuarioId,
    } = tarefa;

    const dataIni = new Date(dataInicial);
    const dataEnt = new Date(dataEntrega);

    if (
      !nomeProjeto ||
      !nomeTarefa ||
      !dataInicial ||
      !dataEntrega ||
      !prioridade ||
      !status ||
      !descricao ||
      !usuarioId
    ) {
      return "Todos os campos devem ser preenchidos.";
    } else if (dataEnt < dataIni) {
      return "A data de entrega não pode ser anterior à data inicial.";
    }

    return null;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const novaTarefa: Tarefa = {
      id: 0,
      nomeProjeto,
      nomeTarefa,
      dataInicial: new Date(dataInicial),
      dataEntrega: new Date(dataEntrega),
      prioridade: parseFloat(prioridade),
      status: parseFloat(status),
      descricao,
      usuarioId: usuarioSelecionado ? parseInt(usuarioSelecionado, 10) : 1,
    };

    const mensagemErro = validarTarefa(novaTarefa);
    if (mensagemErro) {
      toast.error(mensagemErro, {
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
      return;
    }

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

export default ModalTarefa;
