function BemVindo() {
  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="card" style={{ width: "50%" }}>
        <div className="card-body">
          <h5 className="card-title">Gerenciamento de Tarefas</h5>
          <h6 className="card-subtitle mb-2 text-muted">Organize e Priorize</h6>
          <p className="card-text">
            Bem-vindo ao nosso sistema de gerenciamento de prioridades de
            tarefas! Aqui, você pode facilmente criar e gerenciar usuários, além
            de atribuir tarefas de maneira eficiente. Organize suas atividades,
            atribua responsabilidades e mantenha o controle das prioridades para
            garantir que tudo seja concluído no prazo. Nosso sistema é projetado
            para otimizar seu tempo e aumentar a produtividade, permitindo que
            você se concentre no que realmente importa. Comece agora e
            transforme a maneira como você gerencia suas tarefas!
          </p>
          <a
            href="/Usuario"
            className="btn btn-primary"
            style={{ marginRight: "0.5rem" }}
          >
            Usuários
          </a>
          <a href="/Tarefa" className="btn btn-primary">
            Tarefas
          </a>
        </div>
      </div>
    </div>
  );
}

export default BemVindo;
