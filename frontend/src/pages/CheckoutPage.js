import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePayment = async () => {
    try {
      if (!stripe || !elements) return;

      setLoading(true);

      const cardElement = elements.getElement(CardElement);

      const response = await API.post('/orders/create-order', { totalAmount });
      console.log("client id", response)

      let clientSecret = "";
      if (response.data.success) {
        clientSecret = response?.data?.clientSecret;
      } else {
        console.log("error on create payment")
      }
      console.log("client id", response)

      if (clientSecret !== "") {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
            },
          }
        );

        console.log("paymentIntent", paymentIntent);

        if (error) {
          console.log(`Payment failed: ${error.message}`);
        } else if (paymentIntent.status === "succeeded") {
          const data = {
            products: cart.map((item) => ({ id: item._id, name: item.name, price: item.price })),
            totalAmount: totalAmount,
            userId: token ? JSON.parse(atob(token.split('.')[1])).id : null,
            paymentIntent: paymentIntent.id,
          };
          const respo = await API.post('/orders/confirm-order', data);
          if (respo.data.success) {
            clearCart();
            navigate('/success');
          }
          setLoading(false);
        }
      }
    } catch (error) {
      console.log("error", error);
    }

  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total: ${totalAmount}</p>
      <CardElement />
      <button disabled={loading} onClick={handlePayment}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
}

