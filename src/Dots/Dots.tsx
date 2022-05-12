import { ReactElement, useEffect, useState } from "react";
import { StyledDot, StyledDots } from "./Dots.styles";

type DotsProps = {
  count: number;
  currentSlide: number;
  onClick: (dot: number) => void;
};

export const Dots = ({
  count,
  currentSlide,
  onClick,
  ...props
}: DotsProps): ReactElement => {
  const [dots, setDots] = useState<Array<number>>([]);

  useEffect(() => {
    const generateDots = Array.from(
      {
        length: count,
      },
      (_, index) => index
    );

    setDots(generateDots);
  }, [count]);

  return (
    <StyledDots {...props}>
      {dots.map((dot) => (
        <StyledDot
          key={dot}
          onClick={() => onClick(dot)}
          $isActive={currentSlide === dot}
        />
      ))}
    </StyledDots>
  );
};
