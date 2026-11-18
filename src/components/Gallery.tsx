"use client";

import { Carousel } from "acme-carousel";
import Slide from "acme-carousel";

export default function Gallery() {
  const items = [
    { src: "https://picsum.photos/id/237/200/300", alt: "Landscape 1" },
    { src: "https://picsum.photos/id/237/200/300", alt: "Landscape 2" },
    { src: "https://picsum.photos/id/237/200/300", alt: "Landscape 3" },
  ];

  return (
    <Carousel
      items={items}
      autoplay={{
        enabled: true,
        interval: 5000,
        pauseOnHover: true,
      }}
      infinite
    />
  );
}
