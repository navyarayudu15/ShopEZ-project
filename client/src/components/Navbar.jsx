import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import products from "../data/products";

function Navbar({ setSearchQuery }) {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) setUser(userId);
  }, []);

  // 🔥 Live suggestions
  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5)); // limit 5 suggestions
  }, [search]);

  // 🔥 Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    setSearchQuery(search);
    navigate("/");
    setSuggestions([]);
  };

  const handleSuggestionClick = (product) => {
    setSearchQuery(product.title);
    navigate("/");
    setSuggestions([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      <Link to="/" style={styles.logo}>
        ShopEZ
      </Link>

      {/* 🔥 SEARCH SECTION */}
      <div style={styles.searchContainer} ref={dropdownRef}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          style={styles.searchInput}
        />
        <button style={styles.searchBtn} onClick={handleSearch}>
          Search
        </button>

        {/* 🔥 Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div style={styles.dropdown}>
            {suggestions.map((item) => (
              <div
                key={item.id}
                style={styles.suggestionItem}
                onClick={() => handleSuggestionClick(item)}
              >
                <img src={item.image} alt="" style={styles.suggestionImg} />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.rightSection}>
        <Link to="/cart" style={styles.cart}>
          <div style={styles.cartIconContainer}>
            <FaShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span style={styles.badge}>{cartItems.length}</span>
            )}
          </div>
          <span>Cart</span>
        </Link>

        {user ? (
          <button style={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={styles.login}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    background: "#530348",
    color: "white",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "white",
  },
  searchContainer: {
    position: "relative",
    display: "flex",
    flex: 1,
    margin: "0 20px",
  },
  searchInput: {
    flex: 1,
    padding: "8px",
    border: "none",
    outline: "none",
  },
  searchBtn: {
    background: "#eae988",
    border: "none",
    padding: "8px 15px",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "40px",
    left: 0,
    right: 0,
    background: "white",
    color: "black",
    borderRadius: "5px",
    boxShadow: "0 4px 12px rgba(235, 38, 38, 0.2)",
    zIndex: 1000,
  },
  suggestionItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    cursor: "pointer",
  },
  suggestionImg: {
    width: "40px",
    height: "40px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  cart: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    textDecoration: "none",
    color: "white",
  },
  cartIconContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: "-8px",
    right: "-10px",
    background: "#ff9900",
    color: "black",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  login: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logout: {
    background: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Navbar;
