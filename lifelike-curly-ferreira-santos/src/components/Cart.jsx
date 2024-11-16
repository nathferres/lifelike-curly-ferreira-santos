import { useContext } from "react"; 
import CartContext from "../context/CartContext";
import ItemTable from "./ItemTable";  // Renomeado para ItemTable

const ItemRow = ({ quantity, title, total, onClick, onChange }) => {  // Renomeado para ItemRow
  return (
    <tr>
      <td>
        <div>
          <button
            type="button"
            id="decrement-button"
            data-input-counter-decrement="quantity-input"

            onClick={() => {
              onChange(quantity - 1);
            }}
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            id="quantity-input"
            data-input-counter
            aria-describedby="helper-text-explanation"
            value={quantity}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            required
          />
          <button
            type="button"
            id="increment-button"
            data-input-counter-increment="quantity-input"
            onClick={() => {
              onChange(quantity + 1);
            }}
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </td>
      <td>
        {title}
      </td>
      <td>
        ${total}
      </td>
      <td>
        <span onClick={onClick}>
          Remove
        </span>
      </td>
    </tr>
  );
};

export default function Cart() {
  const { cart, dispatch } = useContext(CartContext);

  const total = cart
    ?.reduce((prevItem, currItem) => {  // Alterado para item
      return prevItem + currItem.quantity * currItem.price;
    }, 0)
    .toFixed(2);

  return (
    <div>
      <h2>
        Cart
      </h2>
      <ItemTable>  // Alterado para ItemTable
        {cart?.map(({ id, quantity, title, price }) => (
          <ItemRow  // Alterado para ItemRow
            quantity={quantity}
            title={title}
            total={(price * quantity).toFixed(2)}
            onClick={() => {
              dispatch({
                type: "removeItem",
                itemId: id,  // Alterado para itemId
              });
            }}
            onChange={(newQuantity) => {
              console.log({ id, newQuantity, title, price });

              dispatch({
                type: "changeItemQuantity",  // Alterado para changeItemQuantity
                item: { id, newQuantity: Number(newQuantity), title, price },  // Alterado para item
              });
            }}
          />
        ))}
      </ItemTable>
      <div>
        <span>Total: ${total}</span>
      </div>
    </div>
  );
}

export { Cart };
