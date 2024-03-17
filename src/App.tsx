import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import { useEffect, useState } from "react";

interface Produto {
  id: number;
  nome: string;
  valor: number;
  disponivel: boolean;
}

function App() {
  const baseUrl = "https://localhost:7046/Produto";

  const [updatedData, setUpdateData] = useState(true);

  const [data, setData] = useState<Produto[]>([]);

  const [modalIncluir, setModalIincluir] = useState(false);

  const [modalEditar, setModalEditar] = useState(false);

  const [modalDelete, setModalDelete] = useState(false);

  const [produtoSelecionado, setProdutoSelecionado] = useState({
    id: 0,
    nome: "",
    valor: "",
    disponivel: "",
  });

  const selecionarProduto = (produto: Produto, opcao: string) => {
    setProdutoSelecionado({
      id: produto.id,
      nome: produto.nome,
      valor: produto.valor.toString(), // Convertendo para string
      disponivel: produto.disponivel.toString(), // Convertendo para string
    });
    opcao === "Editar" ? abrirModalEditar() : abrirModalDelete();
  };

  const abrirModal = () => {
    setModalIincluir(!modalIncluir);
  };

  const abrirModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProdutoSelecionado({
      ...produtoSelecionado,
      [name]: value,
    });
  };

  const produtoGet = async () => {
    await axios
      .get(baseUrl)
      .then((resposnse) => {
        setData(resposnse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const produtoPost = async () => {
    try {
      const response = await axios.post(baseUrl, {
        nome: produtoSelecionado.nome,
        valor: parseFloat(produtoSelecionado.valor),
        disponivel: produtoSelecionado.disponivel === "true",
      });
      setData(data.concat(response.data));
      abrirModal();
    } catch (error) {
      console.log(error);
    }
  };

  const produtoPut = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}?id=${produtoSelecionado.id}`,
        {
          ...produtoSelecionado,
          valor: parseFloat(produtoSelecionado.valor),
          disponivel: produtoSelecionado.disponivel === "true",
        }
      );
      console.log("Produto atualizado com sucesso:", response.data);
      const updatedData = data.map((produto) => {
        if (produto.id === produtoSelecionado.id) {
          return {
            ...produto,
            nome: response.data.nome,
            valor: response.data.valor,
            disponivel: response.data.disponivel,
          };
        }
        return produto;
      });
      setData(updatedData);
      abrirModalEditar(); // Fechar o modal de edição após a conclusão
    } catch (error) {
      console.log("Erro ao atualizar o produto:", error);
    }
  };

  const produtoDelete = async () => {
    try {
      const response = await axios.delete(
        `${baseUrl}?id=${produtoSelecionado.id}`
      );
      console.log("Produto excluído com sucesso:", response.data);

      const updatedData = data.filter(
        (produto) => produto.id !== produtoSelecionado.id
      );
      setData(updatedData);

      abrirModalDelete();
    } catch (error) {
      console.log("Erro ao excluir o produto:", error);
    }
  };

  useEffect(() => {
    if (updatedData) {
      produtoGet();
      setUpdateData(false);
    }
  }, [updatedData]);

  return (
    <div className="produto-Container">
      <h3>Cadastro de Produtos</h3>
      <header className="header">
        <button className="btn btn-success" onClick={() => abrirModal()}>
          Cadastrar
        </button>
      </header>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Valor</th>
            <th scope="col">Disponivel</th>
          </tr>
        </thead>
        <tbody>
          {data.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.valor}</td>
              <td>{produto.disponivel ? "Disponível" : "Indisponível"}</td>
              <td>
                <button
                  className=" btn btn-primary"
                  onClick={() => selecionarProduto(produto, "Editar")}
                >
                  Editar
                </button>
                <button
                  className=" btn btn-danger"
                  onClick={() => selecionarProduto(produto, "excluir")}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir Produtos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
            />
            <br />
            <br />
            <label>Valor: </label>
            <br />
            <input
              type="number"
              className="form-control"
              name="valor"
              onChange={handleChange}
            />
            <br />
            <br />
            <label>Disponivel: </label>
            <br />
            <select
              className="form-select"
              aria-label="Default select example"
              name="disponivel"
              onChange={handleChange}
              value={produtoSelecionado.disponivel}
            >
              <option value="true">Disponível</option>
              <option value="false">Indisponível</option>
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className=" btn btn-primary" onClick={() => produtoPost()}>
            Salvar
          </button>
          {"   "}
          <button className=" btn btn-danger" onClick={() => abrirModal()}>
            Calcelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Produtos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <br />
            <input
              type="text"
              className="form-control"
              readOnly
              value={produtoSelecionado && produtoSelecionado.id}
            />
            <br />
            <label>Nome: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nome"
              onChange={handleChange}
              value={produtoSelecionado && produtoSelecionado.nome}
            />
            <br />
            <label>Valor: </label>
            <br />
            <input
              type="number"
              className="form-control"
              name="valor"
              onChange={handleChange}
              value={produtoSelecionado && produtoSelecionado.valor}
            />
            <br />
            <label>Disponivel: </label>
            <br />
            <select
              className="form-select"
              aria-label="Default select example"
              name="disponivel"
              onChange={handleChange}
              value={produtoSelecionado && produtoSelecionado.disponivel}
            >
              <option value="true">Disponível</option>
              <option value="false">Indisponível</option>
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className=" btn btn-primary" onClick={() => produtoPut()}>
            Salvar
          </button>
          {"   "}
          <button
            className=" btn btn-danger"
            onClick={() => abrirModalEditar()}
          >
            Calcelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete}>
        <ModalBody>
          Conforma a eclusão do produto:{" "}
          {produtoSelecionado && produtoSelecionado.id} ?
        </ModalBody>
        <ModalFooter>
          <button className=" btn btn-danger" onClick={() => produtoDelete()}>
            Sim
          </button>
          <button
            className=" btn btn-secondary"
            onClick={() => abrirModalDelete()}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
