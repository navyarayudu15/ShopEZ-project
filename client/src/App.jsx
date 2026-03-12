import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar setSearchQuery={setSearchQuery} />
      <CategoryBar setSelectedCategory={setSelectedCategory} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          }
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </>
  );
}

export default App;
