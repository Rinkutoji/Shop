/**
 * Reusable Button component
 * variants: "primary" | "outline" | "ghost" | "icon"
 * sizes: "sm" | "md" | "lg"
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  style = {},
  className = "",
  type = "button",
}) {
  const variantClass = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost:   "btn-ghost",
    icon:    "btn-icon",
  }[variant];

  const sizeClass = { sm: "btn-sm", md: "", lg: "btn-lg" }[size];

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{ opacity: disabled ? 0.6 : 1, ...style }}
    >
      {children}
    </button>
  );
}