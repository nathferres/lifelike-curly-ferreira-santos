// src/components/ItemList.js
import Item from './Item';

function ItemList({ items }) {
  return (
    <div className="row">
      {items.map(item => (
        <div className="col-md-4" key={item.id}>
          <Item item={item} />
        </div>
      ))}
    </div>
  );
}

export default ItemList;
