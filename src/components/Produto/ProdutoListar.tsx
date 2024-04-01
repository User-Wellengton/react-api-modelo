import React, { useState, useEffect } from "react";
import { Produto } from "../../interfaces/Produto/Produto";

import "./ProdutoListar.css";
import ModalProduto from "./modal/ModalProduto";
import ModalProdutoDelete from "./modal/ModalProdutoDelete";
import produtoService from "../../services/ProductService";
import ModalProdutoEdit from "./modal/ModalProdutoEdit";

const ProdutoListar: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [modalExclusaoAberta, setModalExclusaoAberta] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(
    null
  );
  const [modalAberta, setModalAberta] = useState(false);
  const [modalEdicaoAberta, setModalEdicaoAberta] = useState(false);
  const [produtoEditado, setProdutoEditado] = useState<Produto | null>(null);

  useEffect(() => {
    recarregarProdutos();
  }, []);

  const recarregarProdutos = async () => {
    try {
      const produtos = await produtoService.getAll();
      setProdutos(produtos);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const abrirModalExclusao = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setModalExclusaoAberta(true);
  };

  const fecharModalExclusao = () => {
    setProdutoSelecionado(null);
    setModalExclusaoAberta(false);
  };

  const handleConfirmarExclusao = async () => {
    if (produtoSelecionado) {
      try {
        await produtoService.excluirProduto(produtoSelecionado.id.toString());
        await recarregarProdutos();
        fecharModalExclusao();
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
      }
    }
  };

  const abrirModal = () => {
    setModalAberta(true);
  };

  const fecharModal = () => {
    setModalAberta(false);
  };

  const abrirModalEdicao = (produto: Produto) => {
    setProdutoEditado(produto);
    setModalEdicaoAberta(true);
  };

  const fecharModalEdicao = () => {
    setProdutoEditado(null);
    setModalEdicaoAberta(false);
  };

  const handleProdutoEditado = async (produto: Produto) => {
    try {
      await produtoService.update(produto.id.toString(), produto);
      await recarregarProdutos();
      fecharModalEdicao();
    } catch (error) {
      console.error("Erro ao editar produto:", error);
    }
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
      {produtos.length > 0 ? (
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
                  <button
                    className="btn btn-primary"
                    onClick={() => abrirModalEdicao(produto)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => abrirModalExclusao(produto)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
      <ModalProduto
        isOpen={modalAberta}
        onClose={fecharModal}
        onProdutoCadastrado={handleProdutoCadastrado}
        recarregarProdutos={recarregarProdutos}
      />
      <ModalProdutoDelete
        isOpen={modalExclusaoAberta}
        onClose={fecharModalExclusao}
        produto={produtoSelecionado || undefined}
        onConfirm={handleConfirmarExclusao}
      />
      <ModalProdutoEdit
        isOpen={modalEdicaoAberta}
        onClose={fecharModalEdicao}
        produto={produtoEditado}
        onProdutoEditado={handleProdutoEditado}
      />
    </div>
  );
};

export default ProdutoListar;
