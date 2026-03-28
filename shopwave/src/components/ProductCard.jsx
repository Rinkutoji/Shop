import { useContext, useState } from 'react';
import { CartCtx } from '../context/CartReducer';
import { AppCtx } from '../context/AppProvider';
import Stars from './Stars';
import Icon from './Icon';

const ProductCard = ({ product, onView }) => {
  const { dispatch } = useContext(CartCtx);
  const { addToast } = useContext(AppCtx);
  const [wished, setWished] = useState(false);

  const addToCart = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ADD', product, qty: 1 });
    addToast(`${product.name} added to cart!`, 'success');
  };

  const savings = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <div className="product-card" onClick={() => onView(product)}>
      <div className="product-card-img-wrap">
        <img src={product.image} alt={product.name} className="product-card-img" />
        {savings && <span className="product-card-badge">-{savings}%</span>}
        <button
          className="product-card-wish"
          onClick={(e) => { e.stopPropagation(); setWished(!wished); }}
        >
          <Icon
            name="heart"
            size={16}
            style={wished ? { fill: 'var(--c-accent)', stroke: 'var(--c-accent)' } : {}}
          />
        </button>
      </div>
      <div className="product-card-body">
        <div className="product-card-cat">{product.category}</div>
        <div className="product-card-name">{product.name}</div>
        <div className="product-card-rating">
          <Stars rating={product.rating} size={13} />
          <span className="product-card-reviews">({product.reviews})</span>
        </div>
        <div className="product-card-footer">
          <div className="product-card-price-wrap">
            <span className="product-card-price">${product.price}</span>
            {product.oldPrice && (
              <span className="product-card-old-price">${product.oldPrice}</span>
            )}
          </div>
          <button className="product-card-cart-btn" onClick={addToCart}>
            <Icon name="cart" size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;