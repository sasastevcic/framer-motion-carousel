import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const StyledCarousel = styled.div`
  position: relative;
`;

export const StyledWrapper = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const StyledTrack = styled(motion.div)`
  display: flex;
  width: 100%;
`;

export const StyledArrows = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
`;

const sharedArrowStyles = css`
  position: absolute;
  transform: translateY(-50%);
  padding: 1rem;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const StyledPreviousArrow = styled.button`
  ${sharedArrowStyles};
  left: 2rem;
`;

export const StyledNextArrow = styled.button`
  ${sharedArrowStyles};
  right: 2rem;
`;

export const StyledSlide = styled.div<{ $slidesPerView: number }>`
  flex: 0 0 ${({ $slidesPerView }) => `${100 / $slidesPerView}%`};
  padding: 0 2vw;
`;
