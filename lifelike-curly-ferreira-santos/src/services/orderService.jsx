// src/services/orderService.js
import { db, collection, addDoc } from '../firebase';

export async function createOrder(orderData) {
  const ordersCollection = collection(db, 'orders');
  const docRef = await addDoc(ordersCollection, orderData);
  return docRef.id;
}
