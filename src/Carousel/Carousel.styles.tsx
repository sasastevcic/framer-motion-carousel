import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledCarousel = styled.div`
  position: relative; ;
`;

export const StyledWrapper = styled.div`
	display: flex;
	height: 100%;
	position: relative;
	padding: 3rem 0 5rem;
	overflow: hidden;
`;

export const StyledTrack = styled(motion.div)`
	display: flex;
	width: 100%;
`;

export const StyledSlide = styled.div<{ $slidesPerView: number }>`
	flex: 0 0 ${({ $slidesPerView }) => `${100 / $slidesPerView}%`};
	padding: 0 2vw;
`;
