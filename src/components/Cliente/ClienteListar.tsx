import { useEffect, useState } from "react";
import { Cliente } from "../../interfaces/Cliente/Cliente";
import "./ClienteListar.css";
import clienteService from "../../services/ClienteService";
import { toast, Bounce } from "react-toastify";
import ModalCliente from "./modal/ModalCliente";
import ModalClienteDelete from "./modal/ModalClienteDelete";
import ModalClienteEdit from "./modal/ModalCLienteEdit";

const ClienteListar: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [modalExclusaoAberta, setModalExclusaoAberta] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(
    null
  );
  const [modalAberta, setModalAberta] = useState(false);
  const [modalEdicaoAberta, setModalEdicaoAberta] = useState(false);
  const [clienteEditado, setClienteEditado] = useState<Cliente | null>(null);
  const [nomePesquisado, setNomePesquisado] = useState("");

  useEffect(() => {
    recarregarClientes();
  }, []);

  const recarregarClientes = async () => {
    try {
      const clientes = await clienteService.getAll();
      setClientes(clientes);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  const abrirModalExclusao = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    setModalExclusaoAberta(true);
  };

  const fecharModalExclusao = () => {
    setClienteSelecionado(null);
    setModalExclusaoAberta(false);
  };

  const handleConfirmarExclusao = async () => {
    if (clienteSelecionado) {
      try {
        await clienteService.delete(clienteSelecionado.id.toString());
        await recarregarClientes();
        fecharModalExclusao();

        toast.success("Cliente excluído com SUCESSO!", {
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
        console.error("Erro ao excluir cliente:", error);

        toast.error("Ocorreu um erro ao excluir o Cliente", {
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
    }
  };

  const abrirModal = () => {
    setModalAberta(true);
  };

  const fecharModal = () => {
    setModalAberta(false);
  };

  const abrirModalEdicao = (cliente: Cliente) => {
    setClienteEditado(cliente);
    setModalEdicaoAberta(true);
  };

  const fecharModalEdicao = () => {
    setClienteEditado(null);
    setModalEdicaoAberta(false);
  };

  const handleClienteEditado = async (cliente: Cliente) => {
    try {
      await clienteService.update(cliente.id.toString(), cliente);
      await recarregarClientes();
      fecharModalEdicao();

      toast.success("Cliente atualizado com SUCESSO!", {
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
      console.error("Erro ao editar cliente:", error);

      toast.error("Ocorreu um erro ao atualizar o Cliente", {
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

  const handleClienteCadastrado = async (cliente: Cliente) => {
    setClientes((prevClientes) => [...prevClientes, cliente]);

    await recarregarClientes();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nomePesquisado.trim() === "") {
      console.log("Nome do cliente não pode estar vazio.");
      return;
    }
    try {
      const clientePesquisado = await clienteService.getName(nomePesquisado);
      if (clientePesquisado) {
        setClientes([clientePesquisado]);
      } else {
        console.log("Nenhum cliente encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  return (
    <div className="cliente-Container">
      <h3>Cadastro de Clientes</h3>
      <header className="header">
        <div>
          <button className="btn btn-success" onClick={abrirModal}>
            Cadastrar
          </button>
        </div>
        <div className="botao_pesquisa">
          <form className="form-inline" onSubmit={handleSubmit}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Pesquisar"
              aria-label="Pesquisar"
              value={nomePesquisado}
              onChange={(e) => setNomePesquisado(e.target.value)}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Pesquisar
            </button>
          </form>
        </div>
      </header>
      {clientes.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome e Sobrenome</th>
              <th scope="col">Email</th>
              <th scope="col">Ativo</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>
                  {cliente.nome}
                  {cliente.sobrenome}
                </td>
                <td>{cliente.email}</td>
                <td>{cliente.ativo ? "Ativo" : "Inativo"}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => abrirModalEdicao(cliente)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => abrirModalExclusao(cliente)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum cliente encontrado.</p>
      )}
      <ModalCliente
        isOpen={modalAberta}
        onClose={fecharModal}
        onClienteCadastrado={handleClienteCadastrado}
        recarregarClientes={recarregarClientes}
      />
      <ModalClienteDelete
        isOpen={modalExclusaoAberta}
        onClose={fecharModalExclusao}
        cliente={clienteSelecionado || undefined}
        onConfirm={handleConfirmarExclusao}
      />
      <ModalClienteEdit
        isOpen={modalEdicaoAberta}
        onClose={fecharModalEdicao}
        cliente={clienteEditado}
        onClienteEditado={handleClienteEditado}
      />
    </div>
  );
};

export default ClienteListar;
