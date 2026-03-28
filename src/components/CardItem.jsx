import { useApp } from "../context/AppProvider";
import { useCart } from "../context/CartReducer";
import Icon from "./Icon";

export default function CartItem({ item }) {
  const { dispatch } = useCart();
  const { navigate } = useApp();

  return (
    <div style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid var(--c-border)", alignItems: "flex-start" }} className="slide-up">

      {/* Thumbnail */}
      <div style={{ width: 80, height: 80, flexShrink: 0, overflow: "hidden", background: "var(--c-bg2)", borderRadius: 8, cursor: "pointer" }}
        onClick={() => navigate("/product", item.id)}>
        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 11, color: "var(--c-ink4)", textTransform: "capitalize", marginBottom: 2 }}>{item.category}</p>
        <h4 style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4, marginBottom: 6, cursor: "pointer" }}
          onClick={() => navigate("/product", item.id)}>
          {item.name}
        </h4>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {/* Quantity controls */}
          <div className="qty-ctrl">
            <button onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty - 1 })}>−</button>
            <span>{item.qty}</span>
            <button onClick={() => dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty + 1 })}>+</button>
          </div>
          <span className="price-tag" style={{ fontSize: 16 }}>${(item.price * item.qty).toFixed(2)}</span>
          <span style={{ fontSize: 12, color: "var(--c-ink4)" }}>${item.price.toFixed(2)} each</span>
        </div>
      </div>

      {/* Remove */}
      <button onClick={() => dispatch({ type: "REMOVE", id: item.id })} className="btn-icon btn" style={{ color: "var(--c-ink4)", flexShrink: 0 }}>
        <Icon name="trash" size={16} />
      </button>
    </div>
  );
}