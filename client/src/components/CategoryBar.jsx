function CategoryBar({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Beauty",
    "Sports",
    "Toys",
  ];

  return (
    <div style={styles.container}>
      {categories.map((category) => (
        <div
          key={category}
          onClick={() => setSelectedCategory(category)}
          style={{
            ...styles.category,
            color:
              selectedCategory === category
                ? "#ff9900"
                : "white",
          }}
        >
          {category}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "25px",
    padding: "12px 20px",
    background: "#023d09",
    color: "white",
    overflowX: "auto",
  },
  category: {
    cursor: "pointer",
    fontSize: "16px",
    whiteSpace: "nowrap",
  },
};

export default CategoryBar;
