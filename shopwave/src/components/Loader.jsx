export default function Loader({ full = false }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "60px 20px",
        ...(full ? { minHeight: "60vh" } : {}),
      }}
    >
      <div className="spinner" style={{ width: 36, height: 36 }} />
      <p style={{ color: "var(--c-ink3)", fontSize: 14 }}>Loading...</p>
    </div>
  );
}