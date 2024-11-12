// src/services/itemService.js
import { db, collection, getDocs } from '../firebase';

export async function getItems(categoryId) {
  const itemsCollection = collection(db, 'items');
  const snapshot = await getDocs(itemsCollection);
  const itemsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  if (categoryId) {
    return itemsList.filter((item) => item.category === categoryId);
  }

  return itemsList;
}

export async function getItemById(id) {
  const itemDoc = doc(db, 'items', id);
  const snapshot = await getDoc(itemDoc);
  return { id: snapshot.id, ...snapshot.data() };
}
