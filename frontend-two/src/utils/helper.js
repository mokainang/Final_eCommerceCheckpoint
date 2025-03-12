export function formatCurrency(amount) {
  return amount.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  });
}

export const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://ecommerce-backend-b1pk.onrender.com"
    : "http://localhost:3001";
