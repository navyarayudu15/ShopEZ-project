import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/api/users/register",
        { name, email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data._id);

      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
      console.log(error);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleRegister}>
        <h2>Create Account</h2>

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />

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
          Register
        </button>

        <p style={styles.loginLink}>
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
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
  loginLink: {
    marginTop: "15px",
    fontSize: "14px",
  },
};

export default Register;
