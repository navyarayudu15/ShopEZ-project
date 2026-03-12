import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  return (
    <div style={styles.card}>
      {/* 🔥 Discount Badge */}
      {product.discount > 0 && (
        <div style={styles.badge}>
          {product.discount}% OFF
        </div>
      )}

      <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
  <img src={product.image} alt={product.title} style={styles.image} />
  <h3 style={styles.title}>{product.title}</h3>
</Link>


      <div style={styles.info}>
        <p style={styles.description}>{product.description}</p>

        <div style={styles.priceContainer}>
          <span style={styles.finalPrice}>
            ₹ {discountedPrice}
          </span>

          {product.discount > 0 && (
            <span style={styles.oldPrice}>
              ₹ {product.price}
            </span>
          )}
        </div>

        <button
          style={styles.button}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    position: "relative",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  badge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "red",
    color: "white",
    padding: "5px 8px",
    fontSize: "12px",
    fontWeight: "bold",
    borderRadius: "4px",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  info: {
    padding: "15px",
  },
  title: {
    fontSize: "18px",
    marginBottom: "8px",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
    height: "40px",
    overflow: "hidden",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  finalPrice: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  oldPrice: {
    textDecoration: "line-through",
    color: "gray",
    fontSize: "14px",
  },
  button: {
    background: "#ff9900",
    border: "none",
    padding: "8px",
    width: "100%",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default ProductCard;
