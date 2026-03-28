import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Icon from '../components/Icon';
import { PRODUCTS, CATEGORIES, CAT_EMOJIS } from '../data/products';

const ProductsPage = ({ searchQ, setSearchQ, setDetailProduct, setPage }) => {
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('default');
  const [pageNum, setPageNum] = useState(1);
  const PER = 8;

  let filtered = PRODUCTS.filter(p => {
    const q = searchQ.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchC = cat === 'All' || p.category === cat;
    return matchQ && matchC;
  });

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const total = filtered.length;
  const pages = Math.ceil(total / PER);
  const shown = filtered.slice((pageNum - 1) * PER, pageNum * PER);

  const changeCat = (c) => { setCat(c); setPageNum(1); };

  return (
    <div className="page">
      <div className="products-page">
        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '24px', letterSpacing: '-0.5px' }}>All Products</h1>
        <div className="filters-bar">
          <div className="filter-search">
            <Icon
              name="search"
              size={16}
              className="filter-search-icon"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }}
            />
            <input
              placeholder="Search..."
              value={searchQ}
              onChange={e => { setSearchQ(e.target.value); setPageNum(1); }}
            />
          </div>
          <select className="filter-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <span style={{ color: 'var(--text3)', fontSize: '13px' }}>{total} item{total !== 1 ? 's' : ''}</span>
        </div>

        <div className="cat-tabs">
          {CATEGORIES.map(c => (
            <button key={c} className={`cat-tab ${cat === c ? 'active' : ''}`} onClick={() => changeCat(c)}>
              {CAT_EMOJIS[c]} {c}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <div className="no-results">
            <p>🔍</p>
            <h3>No products found</h3>
            <p style={{ marginTop: '4px' }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="product-grid">
            {shown.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 0.05}s` }}>
                <ProductCard product={p} onView={(product) => { setDetailProduct(product); setPage('detail'); }} />
              </div>
            ))}
          </div>
        )}

        {pages > 1 && (
          <div className="pagination">
            <button className="page-btn" onClick={() => setPageNum(p => Math.max(1, p - 1))} disabled={pageNum === 1}>
              <Icon name="chevLeft" size={16} />
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
              <button key={n} className={`page-btn ${pageNum === n ? 'active' : ''}`} onClick={() => setPageNum(n)}>{n}</button>
            ))}
            <button className="page-btn" onClick={() => setPageNum(p => Math.min(pages, p + 1))} disabled={pageNum === pages}>
              <Icon name="chevRight" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;