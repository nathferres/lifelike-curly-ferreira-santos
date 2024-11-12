// src/App.js
import React from 'react';
import "./assets/styles/App.css"; // Importando o arquivo de estilos globais
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="Bem-vindo à nossa loja!" />} />
          <Route path="/category/:categoryId" element={<ItemListContainer greeting="Produtos da categoria" />} />
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
