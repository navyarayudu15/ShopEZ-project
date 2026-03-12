import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return <h2 style={{ padding: "40px" }}>Product not found</h2>;
  }

  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ← Back
      </button>

      <div style={styles.content}>
        <img
          src={product.image}
          alt={product.title}
          style={styles.image}
        />

        <div style={styles.details}>
          {product.discount > 0 && (
            <div style={styles.badge}>
              {product.discount}% OFF
            </div>
          )}

          <h1>{product.title}</h1>

          <p style={styles.description}>
            {product.description}
          </p>

          <div style={styles.priceBox}>
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
            style={styles.cartBtn}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "20px",
  },
  backBtn: {
    marginBottom: "20px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  content: {
    display: "flex",
    gap: "40px",
  },
  image: {
    width: "400px",
    borderRadius: "8px",
  },
  details: {
    flex: 1,
  },
  badge: {
    background: "red",
    color: "white",
    padding: "6px 10px",
    display: "inline-block",
    marginBottom: "10px",
    borderRadius: "4px",
    fontWeight: "bold",
  },
  description: {
    margin: "15px 0",
    lineHeight: "1.6",
  },
  priceBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  finalPrice: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  oldPrice: {
    textDecoration: "line-through",
    color: "gray",
  },
  cartBtn: {
    background: "#ff9900",
    border: "none",
    padding: "12px 20px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default ProductDetails;
