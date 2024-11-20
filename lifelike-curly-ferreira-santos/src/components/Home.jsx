import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../Firebase";  // Supondo que o seu db esteja configurado corretamente

export function Home() {  // Componente de Home
  const [items, setItems] = useState([]);  // Armazenando os itens
  const [loading, setLoading] = useState(false);  // Controle de loading
  const [error, setError] = useState(null);  // Estado para armazenar erros

  useEffect(() => {
    setLoading(true);  // Definindo como "carregando" antes de começar a consulta
    (async function () {
      try {
        const itemsCol = collection(db, "items");  // Ref para a coleção 'items'
        const itemsSnapshot = await getDocs(itemsCol);  // Consulta assíncrona no Firestore
        
        if (itemsSnapshot.empty) {
          console.log("Nenhum item encontrado no Firestore");
        } else {
          // Mapeando os documentos da coleção para obter os dados
          const itemsList = itemsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log("Itens recebidos do Firebase:", itemsList);  // Log para debug
          setItems(itemsList);  // Atualizando o estado com os dados
        }
      } catch (error) {
        console.error("Erro ao buscar itens:", error);  // Log detalhado de erro
        setError("Houve um erro ao carregar os itens. Tente novamente mais tarde.");  // Atualiza o estado de erro
      } finally {
        setLoading(false);  // Definindo como "não carregando" após o término da consulta
      }
    })();
  }, []);  // O array vazio garante que essa consulta aconteça apenas uma vez, ao montar o componente

  return (
    <div>
      {loading && <h1>Carregando...</h1>}
      {error && <h1>{error}</h1>} {/* Exibindo erro, se houver */}
      <div>
        <h2>Itens Disponíveis</h2>
        {/* Exibindo lista de itens */}
        <div>
          {!loading && !error && items.length > 0 ? (
            items.map((item) => (
              <div key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.description || "Descrição não disponível"}</p>
                <p><strong>Categoria:</strong> {item.categoryId}</p>
                <p><strong>Preço:</strong> {item.price}</p>
                <p><strong>Quantidade:</strong> {item.quantity} disponível(s)</p>
              </div>
            ))
          ) : (
            <p>Nenhum item encontrado.</p>  /* Caso não haja itens */
          )}
        </div>
      </div>
    </div>
  );
}
