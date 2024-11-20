import React from "react";

const ItemTable = ({ children }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Quantidade</th>
          <th>Título</th>
          <th>Total</th>
          <th>Categoria</th>
          <th>Descrição</th>
          <th>Remover</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default ItemTable;
