import { ReactElement } from 'react';
import { useCarousel } from '../hooks/useCarousel';
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
} from './Carousel.styles';

interface CarouselConfig {
	showDots?: boolean;
	showArrows?: boolean;
	perView?: number;
	minPercent?: number;
	minVelocity?: number;
}

interface CarouselProps {
	children: Array<ReactElement>;
	config?: CarouselConfig;
}

const DEFAULT_CONFIG = {
	perView: 1,
	showArrows: true,
	showDots: true,
	minPercent: 60,
	minVelocity: 100,
};

export const Carousel = ({ children, config, ...props }: CarouselProps): ReactElement => {
	const mergeConfigs = { ...DEFAULT_CONFIG, ...config };
	const { perView, showArrows, showDots, ...rest } = mergeConfigs;
	const {
		slidesCurrent,
		dots,
		currentSlide,
		controls,
		variants,
		handleDragEnd,
		handleGoTo,
		handleSlideChange,
	} = useCarousel({ perView, ...rest });

	return (
		<StyledCarousel {...props}>
			<StyledWrapper>
				<StyledTrack
					drag={slidesCurrent.length > 1 ? 'x' : false}
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
								onClick={() => handleSlideChange('Previous')}
								disabled={currentSlide === 0}
							>
								Previous
							</StyledPreviousArrow>
							<StyledNextArrow
								type="button"
								onClick={() => handleSlideChange('Next')}
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
