// src/services/itemService.js
import { db, collection, getDocs } from "../firebase";  // Certifique-se de que está importando corretamente

export async function getItems(categoryId) {
  try {
    const itemsCollection = collection(db, "items");  // Usa a instância do Firestore para acessar a coleção 'items'
    const snapshot = await getDocs(itemsCollection);  // Obtém os documentos da coleção
    const itemsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
    if (categoryId) {
      return itemsList.filter((item) => item.category === categoryId);  // Filtra por categoria, se fornecida
    }

    return itemsList;  // Retorna todos os produtos
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
}
