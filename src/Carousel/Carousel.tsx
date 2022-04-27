/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ReactElement } from 'react';
import { useCarousel } from '../hooks/useCarousel';
// import { CarouselProps } from './Carousel.data';
import { StyledCarousel, StyledWrapper, StyledTrack, StyledSlide } from './Carousel.styles';

type CarouselProps = {
	children: Array<ReactElement>;
	options: ReturnType<typeof useCarousel>;
	slidesPerView?: number;
};

export const Carousel = ({
	children,
	options,
	slidesPerView = 1,
	...props
}: CarouselProps): ReactElement => {
	return (
		<StyledCarousel {...props}>
			<StyledWrapper>
				<StyledTrack
					drag={options.slides.current.length > 1 ? 'x' : false}
					dragMomentum={false}
					onDragEnd={options.handleDragEnd}
					animate={options.controls}
					variants={options.variants}
				>
					{children.map((element, index) => (
						<StyledSlide
							key={index}
							ref={(element: HTMLDivElement) => {
								options.slides.current[index] = element;
							}}
							$slidesPerView={slidesPerView}
						>
							{element}
						</StyledSlide>
					))}
				</StyledTrack>
			</StyledWrapper>
			{/* {options.slides.current.length > 1 && (
      <StyledArrows>
        <StyledPreviousArrow
          onClick={() => options.handleSlideChange('Previous')}
          disabled={options.currentSlide === 0}
        >
          <StyledArrowIcon />
        </StyledPreviousArrow>
        <StyledNextArrow
          onClick={() => options.handleSlideChange('Next')}
          disabled={options.currentSlide === options.slides.current.length - 1}
        >
          <StyledArrowIcon />
        </StyledNextArrow>
      </StyledArrows>
    )} */}
		</StyledCarousel>
	);
};
