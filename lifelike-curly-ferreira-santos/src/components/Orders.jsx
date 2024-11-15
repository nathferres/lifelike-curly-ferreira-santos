import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore/lite";
import { db } from "../Firebase";
import { Link } from "react-router-dom";

const OrderRow = ({ id, total, buyerName }) => {
  return (
    <tr>
      <td>
        {id}
      </td>
      <td>
        {buyerName}
      </td>
      <td>
        {total}
      </td>
      <td>
        <Link to={`/orders/${id}`}>
          See Order
        </Link>
      </td>
    </tr>
  );
};

export default function Orders() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (currentUser) {
      (async function () {
        const ordersCollection = collection(db, "orders");

        const q = query(
          ordersCollection,
          where("buyer.id", "==", currentUser?.uid),
          orderBy("createdAt", "asc")
        );

        const ordersSnapshot = await getDocs(q);

        const ordersResponse = ordersSnapshot?.docs?.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setOrders(ordersResponse);
      })();
    }
  }, [currentUser]);

  return (
    <div>
      <h2>
        Orders
      </h2>
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Buyer</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map(({ id, total, buyer }) => {
                return (
                  <OrderRow
                    key={id}
                    id={id}
                    total={total}
                    buyerName={buyer.name}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
