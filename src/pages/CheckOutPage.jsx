import { useContext, useState } from 'react';
import { CartCtx } from '../context/CartReducer';
import { AppCtx } from '../context/AppProvider';
import Icon from '../components/Icon';

const CheckoutPage = ({ setPage }) => {
  const { cart, dispatch } = useContext(CartCtx);
  const { addToast } = useContext(AppCtx);
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', zip: '', country: '',
    card: '', expiry: '', cvv: ''
  });

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 99 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const placeOrder = () => {
    dispatch({ type: 'CLEAR' });
    setConfirmed(true);
    addToast('Order placed successfully! 🎉', 'success');
  };

  const steps = ['Shipping', 'Payment', 'Review'];

  if (confirmed) return (
    <div className="page">
      <div className="checkout-page">
        <div className="confirm-screen">
          <div className="confirm-icon">🎉</div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase. Your order is on its way!</p>
          <p className="order-num">Order #SW-{Math.floor(Math.random() * 90000) + 10000}</p>
          <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => setPage('products')}>
              Continue Shopping <Icon name="arrow" size={16} />
            </button>
            <button className="btn btn-ghost" onClick={() => setPage('home')}>
              <Icon name="home" size={16} /> Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="checkout-page">
        <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '32px' }}>Checkout</h1>

        {/* Steps */}
        <div className="checkout-steps">
          {steps.map((s, i) => (
            <div key={s} className="step" style={{ flex: i < steps.length - 1 ? 1 : 'none' }}>
              <div className={`step-circle ${step === i ? 'active' : step > i ? 'done' : ''}`}>
                {step > i ? <Icon name="check" size={14} /> : i + 1}
              </div>
              <span className={`step-label ${step === i ? 'active' : ''}`}>{s}</span>
              {i < steps.length - 1 && <div className={`step-line ${step > i ? 'done' : ''}`} />}
            </div>
          ))}
        </div>

        {/* Step 0: Shipping */}
        {step === 0 && (
          <div className="slide-up">
            <div className="form-section">
              <h3>Shipping Information</h3>
              <div className="form-grid">
                <div className="form-group span2">
                  <label>Full Name</label>
                  <input className="form-input" placeholder="John Doe" value={form.name} onChange={update('name')} />
                </div>
                <div className="form-group span2">
                  <label>Email Address</label>
                  <input className="form-input" placeholder="john@example.com" value={form.email} onChange={update('email')} type="email" />
                </div>
                <div className="form-group span2">
                  <label>Street Address</label>
                  <input className="form-input" placeholder="123 Main St" value={form.address} onChange={update('address')} />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input className="form-input" placeholder="New York" value={form.city} onChange={update('city')} />
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input className="form-input" placeholder="10001" value={form.zip} onChange={update('zip')} />
                </div>
                <div className="form-group span2">
                  <label>Country</label>
                  <input className="form-input" placeholder="United States" value={form.country} onChange={update('country')} />
                </div>
              </div>

              {/* Cart summary in shipping step */}
              <div style={{ marginTop: '24px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                {cart.map((item, i) => (
                  <div key={item.id} style={{ display: 'flex', gap: '12px', padding: '12px 16px', borderBottom: i < cart.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, fontSize: '14px', fontWeight: '500' }}>{item.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text3)' }}>×{item.qty}</div>
                    <div style={{ fontWeight: '700', fontSize: '14px' }}>${(item.price * item.qty).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-nav">
              <button className="btn btn-ghost" onClick={() => setPage('cart')}>
                <Icon name="arrowLeft" size={16} /> Back to Cart
              </button>
              <button className="btn btn-primary" onClick={() => setStep(1)}>
                Continue to Payment <Icon name="arrow" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Payment */}
        {step === 1 && (
          <div className="slide-up">
            <div className="form-section">
              <h3>Payment Details</h3>
              <div style={{ background: 'var(--bg2)', borderRadius: '10px', padding: '14px 16px', marginBottom: '20px', fontSize: '13px', color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🔒 Your payment info is encrypted and secure
              </div>
              <div className="form-grid">
                <div className="form-group span2">
                  <label>Cardholder Name</label>
                  <input className="form-input" placeholder="Name on card" value={form.name} onChange={update('name')} />
                </div>
                <div className="form-group span2">
                  <label>Card Number</label>
                  <input className="form-input" placeholder="1234 5678 9012 3456" value={form.card} onChange={update('card')} maxLength={19} />
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input className="form-input" placeholder="MM / YY" value={form.expiry} onChange={update('expiry')} maxLength={7} />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input className="form-input" placeholder="•••" value={form.cvv} onChange={update('cvv')} maxLength={4} type="password" />
                </div>
              </div>
            </div>
            <div className="form-nav">
              <button className="btn btn-ghost" onClick={() => setStep(0)}>
                <Icon name="arrowLeft" size={16} /> Back
              </button>
              <button className="btn btn-primary" onClick={() => setStep(2)}>
                Review Order <Icon name="arrow" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <div className="slide-up">
            <div className="form-section">
              <h3>Order Review</h3>
              <div style={{ border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: '20px' }}>
                {cart.map((item, i) => (
                  <div key={item.id} style={{ display: 'flex', gap: '12px', padding: '14px 16px', borderBottom: i < cart.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '52px', height: '52px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', fontSize: '14px' }}>{item.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text3)' }}>Qty: {item.qty}</div>
                    </div>
                    <div style={{ fontWeight: '700' }}>${(item.price * item.qty).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--surface)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px' }}>
                <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span></div>
                <div className="summary-row"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                <div className="summary-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
            </div>
            <div className="form-nav">
              <button className="btn btn-ghost" onClick={() => setStep(1)}>
                <Icon name="arrowLeft" size={16} /> Back
              </button>
              <button className="btn btn-primary" onClick={placeOrder}>
                🛍️ Place Order · ${total.toFixed(2)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;