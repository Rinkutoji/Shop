import { useContext } from 'react';
import { CartCtx } from '../context/CartReducer';
import { AppCtx } from '../context/AppProvider';
import Icon from '../components/Icon';

const CartPage = ({ setPage }) => {
  const { cart, dispatch } = useContext(CartCtx);
  const { addToast } = useContext(AppCtx);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 99 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) return (
    <div className="page">
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <button className="btn btn-primary" onClick={() => setPage('products')}>
          Start Shopping <Icon name="arrow" size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="cart-page">
        <div>
          <div className="cart-header">
            <h1 style={{ fontSize: '26px', fontWeight: '800' }}>Shopping Cart ({cart.length})</h1>
            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--accent)' }} onClick={() => { dispatch({ type: 'CLEAR' }); addToast('Cart cleared', 'info'); }}>
              Clear all
            </button>
          </div>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cat">{item.category}</div>
                <div className="cart-item-footer">
                  <div className="qty-ctrl" style={{ borderRadius: '8px' }}>
                    <button className="qty-btn" style={{ width: '30px', height: '30px' }} onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty - 1 })}>
                      <Icon name="minus" size={12} />
                    </button>
                    <span className="qty-num" style={{ width: '36px', height: '30px', fontSize: '13px' }}>{item.qty}</span>
                    <button className="qty-btn" style={{ width: '30px', height: '30px' }} onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty + 1 })}>
                      <Icon name="plus" size={12} />
                    </button>
                  </div>
                  <button className="cart-remove" onClick={() => { dispatch({ type: 'REMOVE', id: item.id }); addToast(`${item.name} removed`, 'info'); }}>
                    <Icon name="trash" size={13} /> Remove
                  </button>
                </div>
              </div>
              <div className="cart-item-price">${(item.price * item.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span></div>
          <div className="summary-row"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
          <div className="summary-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <div className="promo-input">
            <input placeholder="Promo code" />
            <button className="btn btn-ghost btn-sm" style={{ border: '1.5px solid var(--border)', borderRadius: '8px' }}>Apply</button>
          </div>
          <button className="btn btn-primary btn-full" onClick={() => setPage('checkout')}>
            Checkout <Icon name="arrow" size={16} />
          </button>
          <button className="btn btn-ghost btn-full" style={{ marginTop: '10px' }} onClick={() => setPage('products')}>
            <Icon name="arrowLeft" size={16} /> Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;