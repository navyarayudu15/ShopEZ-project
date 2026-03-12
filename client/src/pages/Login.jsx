import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/api/users/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data._id);

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2>Sign In</h2>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Sign In
        </button>
<p style={{ marginTop: "15px" }}>
  New user? <Link to="/register">Create your account</Link>
</p>

        <p style={styles.note}>
          By continuing, you agree to ShopEZ's Conditions of Use.
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    background: "#eaeded",
  },
  card: {
    background: "white",
    padding: "30px",
    width: "350px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "8px",
    margin: "8px 0 15px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    background: "#ffd814",
    border: "1px solid #fcd200",
    padding: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  note: {
    marginTop: "15px",
    fontSize: "12px",
    color: "gray",
  },
};

export default Login;
