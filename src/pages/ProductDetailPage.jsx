import { useContext, useState } from 'react';
import { CartCtx } from '../context/CartReducer';
import { AppCtx } from '../context/AppProvider';
import ProductCard from '../components/ProductCard';
import Stars from '../components/Stars';
import Icon from '../components/Icon';
import { PRODUCTS } from '../data/products';

const ProductDetailPage = ({ product, setPage, setDetailProduct }) => {
  const { dispatch } = useContext(CartCtx);
  const { addToast } = useContext(AppCtx);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');
  const [wished, setWished] = useState(false);

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const savings = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;

  const addToCart = () => {
    dispatch({ type: 'ADD', product, qty });
    addToast(`${product.name} added to cart!`, 'success');
  };

  return (
    <div className="page">
      <div className="detail-page">
        <div className="detail-breadcrumb">
          <span onClick={() => setPage('home')}><Icon name="home" size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> Home</span>
          <span>›</span>
          <span onClick={() => setPage('products')}>Products</span>
          <span>›</span>
          <span style={{ color: 'var(--text)' }}>{product.name}</span>
        </div>

        <div className="detail-grid fade-in">
          <div className="detail-img-wrap">
            <img src={product.image} alt={product.name} className="detail-img" />
          </div>
          <div>
            <div className="detail-cat">{product.category}</div>
            <h1 className="detail-title">{product.name}</h1>
            <div className="detail-rating">
              <Stars rating={product.rating} size={18} />
              <span style={{ fontWeight: '600', fontSize: '15px' }}>{product.rating}</span>
              <span style={{ color: 'var(--text3)', fontSize: '13px' }}>({product.reviews} reviews)</span>
            </div>
            <div className="detail-price-row">
              <span className="detail-price">${product.price}</span>
              {product.oldPrice && <span className="detail-price-old">${product.oldPrice}</span>}
              {savings && <span className="detail-badge">Save {savings}%</span>}
            </div>
            <p className="detail-desc">{product.description}</p>

            <div className="qty-row">
              <span className="qty-label">Qty:</span>
              <div className="qty-ctrl">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}><Icon name="minus" size={14} /></button>
                <span className="qty-num">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}><Icon name="plus" size={14} /></button>
              </div>
            </div>

            <div className="detail-actions">
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={addToCart}>
                <Icon name="cart" size={16} /> Add to Cart
              </button>
              <button
                className="btn"
                style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid var(--border)', background: 'var(--surface)' }}
                onClick={() => setWished(!wished)}
              >
                <Icon name="heart" size={18} style={wished ? { fill: 'var(--accent)', stroke: 'var(--accent)' } : { color: 'var(--text2)' }} />
              </button>
            </div>

            <div style={{ marginTop: '20px', padding: '16px', background: 'var(--bg2)', borderRadius: '10px', fontSize: '13px', color: 'var(--text2)', lineHeight: '1.7' }}>
              🚚 Free shipping on this item &nbsp;·&nbsp; 🔄 30-day returns &nbsp;·&nbsp; 🛡️ 2-year warranty
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <div className="tab-list">
            {['description', 'specs', 'reviews'].map(t => (
              <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {tab === 'description' && <p>{product.description} Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>}
            {tab === 'specs' && (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                {[['Category', product.category], ['Price', '$' + product.price], ['Rating', product.rating + ' / 5'], ['Reviews', product.reviews]].map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 0', fontWeight: '600', color: 'var(--text)', width: '140px' }}>{k}</td>
                    <td style={{ padding: '10px 0' }}>{v}</td>
                  </tr>
                ))}
              </table>
            )}
            {tab === 'reviews' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { name: 'Alex M.', rating: 5, comment: 'Absolutely love it! Quality exceeded expectations.', date: '2 weeks ago' },
                  { name: 'Sarah K.', rating: 4, comment: 'Great product, fast shipping. Minor packaging issue.', date: '1 month ago' }
                ].map((r, i) => (
                  <div key={i} style={{ padding: '16px', background: 'var(--bg2)', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '600' }}>{r.name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text3)' }}>{r.date}</span>
                    </div>
                    <Stars rating={r.rating} />
                    <p style={{ marginTop: '8px', fontSize: '14px', color: 'var(--text2)' }}>{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="related">
          <h2>You might also like</h2>
          <div className="product-grid">
            {related.map(p => (
              <ProductCard key={p.id} product={p} onView={(prod) => { setDetailProduct(prod); window.scrollTo(0, 0); }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;