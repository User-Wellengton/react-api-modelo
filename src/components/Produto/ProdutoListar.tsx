import React, { useState, useEffect } from "react";
import { Produto } from "../../interfaces/Produto/Produto";
import ProdutoService from "../../services/ProductService";
import "./ProdutoListar.css";
import ModalProduto from "./modal/ModalProduto";

const ProdutoListar: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [modalAberta, setModalAberta] = useState(false);

  useEffect(() => {
    recarregarProdutos();
  }, []);

  const recarregarProdutos = async () => {
    try {
      const produtos = await ProdutoService.getAll();
      setProdutos(produtos);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const abrirModal = () => {
    setModalAberta(true);
  };

  const fecharModal = () => {
    setModalAberta(false);
  };

  const handleProdutoCadastrado = async (produto: Produto) => {
    setProdutos((prevProdutos) => [...prevProdutos, produto]);

    await recarregarProdutos();
  };

  return (
    <div className="produto-Container">
      <h3>Cadastro de Produtos</h3>
      <header className="header">
        <button className="btn btn-success" onClick={abrirModal}>
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
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>R${produto.valor}</td>
              <td>{produto.disponivel ? "Disponível" : "Indisponível"}</td>
              <td>
                <button className=" btn btn-primary">Editar</button>
                <button className=" btn btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalProduto
        isOpen={modalAberta}
        onClose={fecharModal}
        onProdutoCadastrado={handleProdutoCadastrado}
        recarregarProdutos={recarregarProdutos}
      />
    </div>
  );
};

export default ProdutoListar;
