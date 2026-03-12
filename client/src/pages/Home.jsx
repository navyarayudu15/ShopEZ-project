import products from "../data/products";
import ProductCard from "../components/productCard";
import Hero from "../components/Hero";

function Home({ selectedCategory, searchQuery }) {

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.title
        .toLowerCase()
        .includes(searchQuery?.toLowerCase() || "");

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {selectedCategory === "All" && <Hero />}

      <div style={styles.container}>
        {filteredProducts.length === 0 ? (
          <h2>No products found</h2>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "40px auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "0 20px",
  },
};

export default Home;
