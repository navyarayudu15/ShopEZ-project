import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Hero() {
  const slides = [
    "https://images.unsplash.com/photo-1607082349566-187342175e2f",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  ];

  const [current, setCurrent] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div style={styles.hero}>
      <img
        src={slides[current]}
        alt="banner"
        style={styles.image}
      />

      <div style={styles.overlay}></div>

      <button style={styles.leftArrow} onClick={prevSlide}>
        <FaChevronLeft />
      </button>

      <button style={styles.rightArrow} onClick={nextSlide}>
        <FaChevronRight />
      </button>
    </div>
  );
}

const styles = {
  hero: {
    position: "relative",
    height: "450px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "0.5s ease-in-out",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "200px",
    background: "linear-gradient(to bottom, transparent, #eaeded)",
  },
  leftArrow: {
    position: "absolute",
    top: "50%",
    left: "20px",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.6)",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },
  rightArrow: {
    position: "absolute",
    top: "50%",
    right: "20px",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.6)",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },
};

export default Hero;
