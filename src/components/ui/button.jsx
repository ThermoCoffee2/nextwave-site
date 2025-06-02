export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-black text-white hover:opacity-90 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
