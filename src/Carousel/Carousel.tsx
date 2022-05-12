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

type CarouselProps = {
  children: Array<ReactElement>;
  slidesPerView?: number;
};

export const Carousel = ({
  children,
  slidesPerView = 1,
  ...props
}: CarouselProps): ReactElement => {
  const {
    slides,
    currentSlide,
    controls,
    variants,
    handleDragEnd,
    handleGoTo,
    handleSlideChange,
  } = useCarousel(slidesPerView);

  const { current: slidesCurrent } = slides;
  const [dots, setDots] = useState<Array<number>>([]);

  useEffect(() => {
    const generateDots = Array.from(
      {
        length: slidesCurrent.length - slidesPerView + 1,
      },
      (_, index) => index
    );

    setDots(generateDots);
  }, [slidesCurrent, slidesPerView]);

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
              $slidesPerView={slidesPerView}
            >
              {element}
            </StyledSlide>
          ))}
        </StyledTrack>
      </StyledWrapper>
      {slidesCurrent.length > 1 && (
        <>
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
              disabled={currentSlide === slidesCurrent.length - slidesPerView}
            >
              Next
            </StyledNextArrow>
          </StyledArrows>
          <StyledDots>
            {dots.map((dot: number) => (
              <StyledDot
                key={dot}
                onClick={() => handleGoTo(dot)}
                $isActive={currentSlide === dot}
              />
            ))}
          </StyledDots>
        </>
      )}
    </StyledCarousel>
  );
};
