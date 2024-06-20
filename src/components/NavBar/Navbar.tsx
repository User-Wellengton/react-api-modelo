const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Produto">
                Produto
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/Cliente">
                Cliente
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/Usuario">
                Usuário
              </a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="/Tarefa">
                Tarefa
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
