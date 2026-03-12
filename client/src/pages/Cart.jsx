import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
    const subtotal = total.toFixed(2);
    

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h1>Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} style={styles.item}>
              <img
                src={item.image}
                alt={item.title}
                style={styles.image}
              />
              <div style={{ flex: 1 }}>
                <h3>{item.title}</h3>
                <p>₹ {item.price}</p>

                <button
                  style={styles.removeBtn}
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={styles.right}>
        <h2>Subtotal</h2>
        <h1>₹ {subtotal}</h1>
        <button style={styles.checkout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  left: {
    flex: 3,
  },
  right: {
    flex: 1,
    background: "#f3f3f3",
    padding: "20px",
    height: "fit-content",
  },
  item: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "15px",
  },
  image: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
  },
  removeBtn: {
    marginTop: "10px",
    background: "transparent",
    border: "none",
    color: "#007185",
    cursor: "pointer",
    padding: 0,
  },
  checkout: {
    background: "#ff9900",
    border: "none",
    padding: "10px",
    width: "100%",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Cart;
