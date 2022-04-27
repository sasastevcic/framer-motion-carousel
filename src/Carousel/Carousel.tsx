/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ReactElement } from 'react';
import { useCarousel } from '../hooks/useCarousel';
// import { CarouselProps } from './Carousel.data';
import { StyledCarousel, StyledWrapper, StyledTrack, StyledArrows, StyledPreviousArrow, StyledNextArrow, StyledSlide } from './Carousel.styles';

type CarouselProps = {
	children: Array<ReactElement>;
	slidesPerView?: number;
};

export const Carousel = ({
	children,
	slidesPerView = 1,
	...props
}: CarouselProps): ReactElement => {
  const { slides, currentSlide, controls, variants, handleDragEnd, handleSlideChange } = useCarousel(slidesPerView);

	return (
		<StyledCarousel {...props}>
			<StyledWrapper>
				<StyledTrack
					drag={slides.current.length > 1 ? 'x' : false}
					dragMomentum={false}
					onDragEnd={handleDragEnd}
					animate={controls}
					variants={variants}
				>
					{children.map((element, index) => (
						<StyledSlide
							key={index}
							ref={(element: HTMLDivElement) => {
								slides.current[index] = element;
							}}
							$slidesPerView={slidesPerView}
						>
							{element}
						</StyledSlide>
					))}
				</StyledTrack>
			</StyledWrapper>
			{slides.current.length > 1 && (
				<StyledArrows>
					<StyledPreviousArrow
						type="button"
						onClick={() => handleSlideChange('Previous')}
						disabled={currentSlide === 0}
					>
						Previous
					</StyledPreviousArrow>
					<StyledNextArrow
						type="button"
						onClick={() => handleSlideChange('Next')}
						disabled={currentSlide === slides.current.length - slidesPerView}
					>
						Next
					</StyledNextArrow>
				</StyledArrows>
			)}
		</StyledCarousel>
	);
};
