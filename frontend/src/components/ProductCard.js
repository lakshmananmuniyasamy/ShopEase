const ProductCard = ({ product, addToCart }) => (
    <div style={{ border: '1px solid black', padding: 10, margin: 10 }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <img src={product.image} width="100" alt="product" />
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
  
  export default ProductCard;
  