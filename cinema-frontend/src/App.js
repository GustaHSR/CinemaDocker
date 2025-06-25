import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import CadastroFilmes from './pages/CadastroFilmes';
import CadastroSalas from './pages/CadastroSalas';
import CadastroSessoes from './pages/CadastroSessoes';
import VendaIngressos from './pages/VendaIngressos';
import ListagemSessoes from './pages/ListagemSessoes';
import Sobre from './pages/Sobre';

function App() {
  return (
    <Router>
      <header className="header">
        <div className="nav-container">
          <div className="nav-title">🎥 Controle de Cinema</div>
          <nav className="nav-menu">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
              end
            >
              🏠 Início
            </NavLink>
            <NavLink 
              to="/cadastro-filmes" 
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              🎬 Cadastro de Filmes
            </NavLink>
            <NavLink 
              to="/cadastro-salas" 
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              🏢 Cadastro de Salas
            </NavLink>
            <NavLink 
              to="/cadastro-sessoes" 
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              📅 Cadastro de Sessões
            </NavLink>
            <NavLink 
              to="/venda-ingressos" 
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              🛒 Venda de Ingressos
            </NavLink>
            <NavLink 
              to="/sessoes" 
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              📽️ Sessões Disponíveis
            </NavLink>

             <NavLink 
              to="/sobre" 
              className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
            >
              ℹ️ Sobre esta aplicação
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro-filmes" element={<CadastroFilmes />} />
          <Route path="/cadastro-salas" element={<CadastroSalas />} />
          <Route path="/cadastro-sessoes" element={<CadastroSessoes />} />
          <Route path="/venda-ingressos" element={<VendaIngressos />} />
          <Route path="/sessoes" element={<ListagemSessoes />} />
          <Route path="/sobre" element={<Sobre />}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
