import React from "react";

export default function ItemTable({ children }) {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Quantity</th>
          <th scope="col">Item Name</th>
          <th scope="col">Total</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  );
}
