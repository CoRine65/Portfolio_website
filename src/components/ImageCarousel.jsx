// src/components/ImageCarousel.jsx
import { useState } from "react";

export default function ImageCarousel({ images }) {
  const [index, setIndex] = useState(0);

  const prevImage = () => {
    setIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const nextImage = () => {
    setIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="carousel">
      <img src={images[index].src} alt={images[index].alt} />

      {images.length > 1 && (
        <>
          <button className="carouselBtn carouselBtn_left" onClick={prevImage}>
            ‹
          </button>

          <button className="carouselBtn carouselBtn_right" onClick={nextImage}>
            ›
          </button>
        </>
      )}
    </div>
  );
}
