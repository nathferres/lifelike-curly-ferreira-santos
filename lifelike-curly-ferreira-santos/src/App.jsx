import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import { CartProvider } from './context/CartContext'; // Importando o CartProvider

function App() {
  return (
    <Router>
      <CartProvider>  {/* Envolvendo tudo com o CartProvider */}
        <div className="app-container">
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer greeting="Bem-vindo à nossa loja!" />} />
            <Route path="/category/:categoryId" element={<ItemListContainer greeting="Produtos da categoria" />} />
            {/* Outras rotas podem ser adicionadas aqui */}
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
