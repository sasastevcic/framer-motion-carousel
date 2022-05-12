import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useAnimation, Variants } from 'framer-motion';
import { DragHandler } from 'framer-motion/types/gestures/drag/types';
import { useEvent } from 'react-use';
import debounce from 'lodash.debounce';

type DirectionType = 'Next' | 'Previous';
type SwipeType = 'Left' | 'Right';

type CarouselHookConfig = {
	perView: number;
	minPercent: number;
	minVelocity: number;
};

const getSwipeLength = (offset: number, absDistance: number) => {
	return (offset / absDistance) * 100;
};

const getSwipeDirection = (length: number): SwipeType => (length > 0 ? 'Right' : 'Left');

const getStepLength = (direction: SwipeType, length: number) =>
	direction === 'Right' ? Math.ceil(length / 100) : Math.floor(length / 100);

export const useCarousel = ({ perView, minPercent, minVelocity }: CarouselHookConfig) => {
	const { current: slidesCurrent } = useRef<Array<HTMLDivElement>>([]);
	const controls = useAnimation();
	const [currentSlide, setCurrentSlide] = useState(0);
	const [slideWidth, setSlideWidth] = useState(0);
	const [dots, setDots] = useState<Array<number>>([]);

	const getTranslate = useMemo(() => -slideWidth * currentSlide, [currentSlide, slideWidth]);

	const variants: Variants = {
		translate: {
			x: getTranslate,
			transition: {
				ease: [0.86, 0, 0.07, 1],
				duration: 0.5,
			},
		},
	};

	const startAnimation = useCallback(() => {
		controls.start('translate');
	}, [controls]);

	const handleSlideChange = (step: DirectionType) => {
		if (step === 'Next') {
			setCurrentSlide((currentState) => currentState + 1);
		} else if (step === 'Previous') {
			setCurrentSlide((currentState) => currentState - 1);
		}
	};

	const handleGoTo = (slideNumber: number) => {
		setCurrentSlide(slideNumber);
	};

	const handleReset = () => {
		setCurrentSlide(0);
	};

	const handleDragEnd: DragHandler = (_event, { offset, velocity }) => {
		const length = Math.round(getSwipeLength(offset.x, slideWidth));
		const velocityX = velocity.x;

		const swipeDirection = getSwipeDirection(length);
		const stepLength = getStepLength(swipeDirection, length);

		const lastSlide = slidesCurrent.length - perView;
		const isNotFirst = currentSlide > 0;
		const isNotLast = currentSlide < lastSlide;

		const notFirstNorLast =
			(isNotFirst || swipeDirection === 'Left') && (isNotLast || swipeDirection === 'Right');
		const isSwipedEnough = Math.abs(length) > minPercent || Math.abs(velocityX) > minVelocity;

		if (isSwipedEnough && notFirstNorLast) {
			setCurrentSlide((currentState) => {
				if (currentState - stepLength > lastSlide) {
					return lastSlide;
				} else if (currentState - stepLength < 0) {
					return 0;
				} else {
					return currentState - stepLength;
				}
			});
		} else {
			startAnimation();
		}
	};

	useEvent(
		'resize',
		debounce(() => {
			setSlideWidth(slidesCurrent[0].clientWidth);
		}, 300),
	);

	useEffect(() => {
		const generateDots = Array.from(
			{
				length: slidesCurrent.length - perView + 1,
			},
			(_, index) => index,
		);

		setDots(generateDots);
	}, [slidesCurrent, perView]);

	useEffect(() => {
		startAnimation();
	}, [slideWidth, currentSlide, startAnimation]);

	useEffect(() => {
		if (slidesCurrent.length > 0) {
			setSlideWidth(slidesCurrent[0].clientWidth);
		}
	}, [slidesCurrent]);

	return {
		slidesCurrent,
		dots,
		currentSlide,
		controls,
		variants,
		handleDragEnd,
		handleSlideChange,
		handleGoTo,
		handleReset,
	} as const;
};
