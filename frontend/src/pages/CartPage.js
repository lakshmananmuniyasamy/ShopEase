import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h2>Cart</h2>
      {cart.map((item) => (
        <div key={item._id}>
          {item.name} - ${item.price}
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
