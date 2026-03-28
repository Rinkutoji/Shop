import { useContext } from 'react';
import { CartCtx } from '../context/CartReducer';
import { AppCtx } from '../context/AppProvider';
import Icon from './Icon';

const Navbar = ({ page, setPage, searchQ, setSearchQ }) => {
  const { cart } = useContext(CartCtx);
  const { dark, setDark } = useContext(AppCtx);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  const handleToggle = () => {
    setDark(prev => !prev);
  };

  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => setPage('home')}>
        ShopWave<span className="nav-logo-dot">.</span>
      </div>

      <div className="nav-search">
        <Icon
          name="search"
          size={16}
          style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-ink3)' }}
        />
        <input
          placeholder="Search products..."
          value={searchQ}
          onChange={e => { setSearchQ(e.target.value); setPage('products'); }}
        />
      </div>

      <div className="nav-actions">
        <button
          className={`nav-btn ${page === 'home' ? 'active' : ''}`}
          onClick={() => setPage('home')}
        >
          <Icon name="home" size={16} /> Home
        </button>
        <button
          className={`nav-btn ${page === 'products' ? 'active' : ''}`}
          onClick={() => setPage('products')}
        >
          Products
        </button>
        <button
          className={`nav-btn cart-btn ${page === 'cart' ? 'active' : ''}`}
          onClick={() => setPage('cart')}
        >
          <Icon name="cart" size={18} />
          {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
        </button>
        <button className="dark-toggle" onClick={handleToggle} title={dark ? 'Light mode' : 'Dark mode'}>
          <Icon name={dark ? 'sun' : 'moon'} size={18} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;