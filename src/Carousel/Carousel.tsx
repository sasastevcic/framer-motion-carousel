import { ReactElement, useEffect, useState } from "react";
import { useCarousel } from "../hooks/useCarousel";
import {
  StyledCarousel,
  StyledWrapper,
  StyledTrack,
  StyledArrows,
  StyledPreviousArrow,
  StyledNextArrow,
  StyledSlide,
  StyledDots,
  StyledDot,
} from "./Carousel.styles";

interface CarouselConfig {
  showDots?: boolean;
  showArrows?: boolean;
  perView?: number;
}

interface CarouselProps {
  children: Array<ReactElement>;
  config?: CarouselConfig;
}

const DEFAULT_CONFIG = {
  perView: 1,
  showArrows: true,
  showDots: true,
};

export const Carousel = ({
  children,
  config,
  ...props
}: CarouselProps): ReactElement => {
  const mergedConfigs = { ...DEFAULT_CONFIG, ...config };
  const { perView, showArrows, showDots } = mergedConfigs;
  const {
    slides,
    currentSlide,
    controls,
    variants,
    handleDragEnd,
    handleGoTo,
    handleSlideChange,
  } = useCarousel(perView);

  const { current: slidesCurrent } = slides;
  const [dots, setDots] = useState<Array<number>>([]);

  useEffect(() => {
    const generateDots = Array.from(
      {
        length: slidesCurrent.length - perView + 1,
      },
      (_, index) => index
    );

    setDots(generateDots);
  }, [slidesCurrent, perView]);

  return (
    <StyledCarousel {...props}>
      <StyledWrapper>
        <StyledTrack
          drag={slidesCurrent.length > 1 ? "x" : false}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          animate={controls}
          variants={variants}
        >
          {children.map((element, index) => (
            <StyledSlide
              key={index}
              ref={(element: HTMLDivElement) => {
                slidesCurrent[index] = element;
              }}
              $slidesPerView={perView}
            >
              {element}
            </StyledSlide>
          ))}
        </StyledTrack>
      </StyledWrapper>
      {slidesCurrent.length > 1 && (
        <>
          {showArrows && (
            <StyledArrows>
              <StyledPreviousArrow
                type="button"
                onClick={() => handleSlideChange("Previous")}
                disabled={currentSlide === 0}
              >
                Previous
              </StyledPreviousArrow>
              <StyledNextArrow
                type="button"
                onClick={() => handleSlideChange("Next")}
                disabled={currentSlide === slidesCurrent.length - perView}
              >
                Next
              </StyledNextArrow>
            </StyledArrows>
          )}
          {showDots && (
            <StyledDots>
              {dots.map((dot: number) => (
                <StyledDot
                  key={dot}
                  onClick={() => handleGoTo(dot)}
                  $isActive={currentSlide === dot}
                />
              ))}
            </StyledDots>
          )}
        </>
      )}
    </StyledCarousel>
  );
};
