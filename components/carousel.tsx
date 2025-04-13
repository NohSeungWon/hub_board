"use client";
import { useState, useEffect } from "react";
import { DISPLAY_MODE } from "@/constants/crousel";
import { cn } from "@/lib/utils";

type CarouselProps = {
  images: string[];
  autoPlayInterval?: number;
  displayMode?: (typeof DISPLAY_MODE)[keyof typeof DISPLAY_MODE];
  fullWidth?: boolean;
  fullHeight?: boolean;
  className?: string;
};

const LeftArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 fill-white"
  >
    <path d="M15 19l-7-7 7-7" />
  </svg>
);

const RightArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6 fill-white"
  >
    <path d="M9 5l7 7-7 7" />
  </svg>
);

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlayInterval = 0,
  displayMode = DISPLAY_MODE.Arrows,
  fullWidth = false,
  fullHeight = false,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (!autoPlayInterval) return;
    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [currentIndex, autoPlayInterval]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className={cn(
        "relative",
        fullWidth ? "w-screen ml-[calc(50%-50vw)]" : "w-full",
        fullHeight && "h-screen",
        className
      )}
    >
      {/* 이미지 슬라이드 */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
        />
      </div>

      {/* 좌우 화살표 */}
      {displayMode === DISPLAY_MODE.Arrows && (
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <button
            onClick={prevSlide}
            className="bg-gray-800/50 p-2 rounded-full hover:bg-gray-700"
          >
            <LeftArrow />
          </button>
          <button
            onClick={nextSlide}
            className="bg-gray-800/50 p-2 rounded-full hover:bg-gray-700"
          >
            <RightArrow />
          </button>
        </div>
      )}

      {/* 도트 네비게이션 */}
      {displayMode === DISPLAY_MODE.Dots && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
