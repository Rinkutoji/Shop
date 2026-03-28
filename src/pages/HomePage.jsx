import { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import Icon from '../components/Icon';
import { PRODUCTS, CATEGORIES, CAT_EMOJIS } from '../data/products';

const HomePage = ({ setPage, setSearch }) => {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <div className="page">
      <div className="hero">
        <h1>Shop what <span>matters</span><br />to you.</h1>
        <p className="hero-sub">
          Curated products from brands that care about quality, sustainability, and your satisfaction.
        </p>
        <div className="hero-btns">
          <button className="btn btn-primary btn-lg" onClick={() => setPage('products')}>
            Browse All <Icon name="arrow" size={16} />
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => { setSearch('Electronics'); setPage('products'); }}>
            New Arrivals
          </button>
        </div>
      </div>

      <div className="categories">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map(c => (
            <div key={c} className="cat-card" onClick={() => { setSearch(''); setPage('products'); }}>
              <span className="cat-emoji">{CAT_EMOJIS[c]}</span>
              <div className="cat-name">{c}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="categories">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <button className="btn btn-ghost btn-sm" onClick={() => setPage('products')}>View all →</button>
        </div>
        <div className="product-grid">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} onView={() => setPage('detail', p)} />
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={{ background: 'var(--c-accent)', padding: '48px 24px', textAlign: 'center', marginTop: '20px', borderRadius: 'var(--r-lg)' }}>
        <h2 style={{ color: '#fff', fontSize: '28px', fontWeight: '800', marginBottom: '10px' }}>
          Free shipping on orders over $99
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '24px' }}>
          Use code WAVE10 for 10% off your first order
        </p>
        <button
          className="btn btn-lg"
          style={{ background: '#fff', color: 'var(--c-accent)', fontWeight: '700' }}
          onClick={() => setPage('products')}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;