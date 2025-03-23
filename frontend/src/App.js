import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import './styles.css';


const stripePromise = loadStripe('pk_test_51QLjVlJQmVFcYsR1DlzwlYgBnq97kYxqu0Il9q0XJF4CBBjb7eAOxLkzwcI61Ya8JlY76JTSnLwFBNMHqDgaVutd00mDkg6m1v'); // Your Stripe publishable key here

export default function App() {
  return (
    <Elements stripe={stripePromise}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<ShopPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/success" element={<OrderSuccessPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </Elements>
  );
}
