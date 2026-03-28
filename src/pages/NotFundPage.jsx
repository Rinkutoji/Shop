import { useApp } from "../context/AppProvider";
import Icon from "../components/Icon";

export default function NotFoundPage() {
  const { navigate } = useApp();

  return (
    <div
      className="fade-in"
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "100px 20px",
        textAlign: "center",
      }}
    >
      {/* Big 404 */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(80px,15vw,140px)",
          lineHeight: 1,
          color: "var(--c-bg3)",
          letterSpacing: "-4px",
          marginBottom: 8,
          userSelect: "none",
        }}
      >
        404
      </div>

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 24,
          marginBottom: 12,
        }}
      >
        Page Not Found
      </h2>

      <p style={{ color: "var(--c-ink3)", marginBottom: 32 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/")}
        >
          <Icon name="home" size={16} /> Home
        </button>
        <button
          className="btn btn-outline btn-lg"
          onClick={() => navigate("/products")}
        >
          Browse Products
        </button>
      </div>
    </div>
  );
}