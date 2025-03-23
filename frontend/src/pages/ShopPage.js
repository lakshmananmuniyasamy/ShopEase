import { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/CartContext';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get('/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {products.map(product => (
        <ProductCard key={product._id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}
