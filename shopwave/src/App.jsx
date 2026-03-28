import { useState, useContext } from 'react';
import { AppCtx } from './context/AppProvider';
import { CartCtx } from './context/CartReducer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from './pages/CartPage';
import CheckoutPage from "./pages/CheckOutPage";

function App() {
  const { toasts, removeToast } = useContext(AppCtx);
  const [page, setPageRaw] = useState('home');
  const [detailProduct, setDetailProduct] = useState(null);
  const [searchQ, setSearchQ] = useState('');

  const setPage = (p, product) => {
    if (product) setDetailProduct(product);
    setPageRaw(p);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Navbar
        page={page}
        setPage={setPage}
        searchQ={searchQ}
        setSearchQ={v => { setSearchQ(v); setPage('products'); }}
      />

      {page === 'home' && (
        <HomePage
          setPage={setPage}
          setSearch={v => { setSearchQ(v); setPage('products'); }}
        />
      )}
      {page === 'products' && (
        <ProductsPage
          searchQ={searchQ}
          setSearchQ={setSearchQ}
          setDetailProduct={setDetailProduct}
          setPage={setPage}
        />
      )}
      {page === 'detail' && detailProduct && (
        <ProductDetailPage
          product={detailProduct}
          setPage={setPage}
          setDetailProduct={setDetailProduct}
        />
      )}
      {page === 'cart' && <CartPage setPage={setPage} />}
      {page === 'checkout' && <CheckoutPage setPage={setPage} />}

      {page !== 'checkout' && <Footer setPage={setPage} />}

      <Toast toasts={toasts} removeToast={removeToast} />
    </>
  );
}

export default App;