import { useEffect, useState } from "react";
import { Usuario } from "../../interfaces/Usuario/Usuario";
import "./UsuarioListar.css";
import usuarioService from "../../services/UsuarioService";
import { toast, Bounce } from "react-toastify";
import ModalUsuario from "./modal/ModalUsuario";
import ModalUsuarioDelete from "./modal/ModalUsuarioDelete";
import ModalUsuarioEdit from "./modal/ModalUsuarioEdit";
import { AxiosResponse } from "axios";

const UsuarioListar: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalExclusaoAberta, setModalExclusaoAberta] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(
    null
  );
  const [modalAberta, setModalAberta] = useState(false);
  const [modalEdicaoAberta, setModalEdicaoAberta] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState<Usuario | null>(null);
  const [nomePesquisado, setNomePesquisado] = useState("");

  useEffect(() => {
    recarregarUsuarios();
  }, []);

  const recarregarUsuarios = async () => {
    try {
      const usuarios = await usuarioService.getAll();
      setUsuarios(usuarios);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const abrirModalExclusao = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setModalExclusaoAberta(true);
  };

  const fecharModalExclusao = () => {
    setUsuarioSelecionado(null);
    setModalExclusaoAberta(false);
  };

  const handleConfirmarExclusao = async () => {
    if (usuarioSelecionado) {
      try {
        const response: AxiosResponse<any> = await usuarioService.delete(
          usuarioSelecionado.id.toString()
        );

        console.log("Response do back-end:", response); // Log para verificar a resposta completa

        const responseMessage =
          response.data || "Usuário excluído com sucesso!";

        await recarregarUsuarios();
        fecharModalExclusao();

        toast.success(responseMessage, {
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
      } catch (error: any) {
        console.error("Erro ao excluir usuário:", error);
        console.log("Erro completo:", error.response); // Log para verificar a resposta de erro completa

        const errorMessage =
          error.response?.data || "Ocorreu um erro ao excluir o Usuário";

        toast.error(errorMessage, {
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

  const abrirModalEdicao = (usuario: Usuario) => {
    setUsuarioEditado(usuario);
    setModalEdicaoAberta(true);
  };

  const fecharModalEdicao = () => {
    setUsuarioEditado(null);
    setModalEdicaoAberta(false);
  };

  const handleUsuarioEditado = async (usuario: Usuario) => {
    try {
      await usuarioService.update(usuario.id.toString(), usuario);

      await recarregarUsuarios();
      fecharModalEdicao();

      toast.success("Usuário atualizado com sucesso!", {
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
    } catch (error: any) {
      console.error("Erro ao editar usuário:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Ocorreu um erro ao atualizar o Usuário";

      toast.error(errorMessage, {
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

  const handleUsuarioCadastrado = async (usuario: Usuario) => {
    setUsuarios((prevUsuarios) => [...prevUsuarios, usuario]);

    await recarregarUsuarios();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nomePesquisado.trim() === "") {
      toast.error("Nome do usuário não pode estar vazio.");
      return;
    }
    try {
      const usuarioPesquisado = await usuarioService.getName(nomePesquisado);
      if (usuarioPesquisado) {
        setUsuarios([usuarioPesquisado]);
        toast.success("Usuário encontrado com sucesso!");
      } else {
        toast.warning("Nenhum usuário encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      toast.error("Erro ao buscar usuários.");
    }
  };

  return (
    <div className="usuario-Container">
      <h3>Cadastro de Usuario</h3>
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
      {usuarios.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => abrirModalEdicao(usuario)}
                  >
                    Visualizar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => abrirModalExclusao(usuario)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum usuario encontrado.</p>
      )}
      <ModalUsuario
        isOpen={modalAberta}
        onClose={fecharModal}
        onUsuarioCadastrado={handleUsuarioCadastrado}
        recarregarUsuarios={recarregarUsuarios}
      />
      <ModalUsuarioDelete
        isOpen={modalExclusaoAberta}
        onClose={fecharModalExclusao}
        usuario={usuarioSelecionado || undefined}
        onConfirm={handleConfirmarExclusao}
      />
      <ModalUsuarioEdit
        isOpen={modalEdicaoAberta}
        onClose={fecharModalEdicao}
        usuario={usuarioEditado}
        onUsuarioEditado={handleUsuarioEditado}
      />
    </div>
  );
};

export default UsuarioListar;
