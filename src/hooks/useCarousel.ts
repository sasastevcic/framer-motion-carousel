/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState, useRef, useMemo, useReducer } from 'react';
import { useAnimation, Variants } from 'framer-motion';
import { DragHandler } from 'framer-motion/types/gestures/drag/types';
import { useEvent } from 'react-use';

type DirectionType = 'Next' | 'Previous';

const MIN_PERCENT = 60;
const MIN_VELOCITY = 100;

const swipeLength = (offset: number, absDistance: number) => {
	return (offset / absDistance) * 100;
};

export const useCarousel = (slidesPerView = 1) => {
	const slides = useRef<Array<HTMLDivElement>>([]);
	const controls = useAnimation();
	const [currentSlide, setCurrentSlide] = useState(0);
	const slideWidth = useRef(0);
	const [_, forceUpdate] = useReducer(() => [], []);

  const getTranslate = useMemo(() => -slideWidth.current * currentSlide, [currentSlide]);

	const variants: Variants = {
		translate: {
			x: getTranslate,
			transition: {
				ease: [0.86, 0, 0.07, 1],
				duration: 0.5,
			},
		},
	}; 

	const startAnimation = () => {
		controls.start('translate');
	};

	const handleSlideChange = (step: DirectionType) => {
		if (step === 'Next') {
			setCurrentSlide((currentState) => currentState + 1);
		} else if (step === 'Previous') {
			setCurrentSlide((currentState) => currentState - 1);
		}
	};

	const handleReset = () => {
		setCurrentSlide(0);
	};

	const handleDragEnd: DragHandler = (_event, { offset, velocity }) => {
		const length = Math.round(swipeLength(offset.x, slideWidth.current));
		const velocityX = velocity.x;

    const swipeRight = length < 0;
    const swipeLeft = length > 0;
    const stepLength = swipeLeft ? Math.ceil(length / 100) : Math.floor(length / 100);
    const lastSlide = slides.current.length - slidesPerView;
    const isNotFirst = currentSlide > 0;
    const isNotLast = currentSlide < lastSlide;

    const notFirstNorLast = (isNotFirst || swipeRight) && (isNotLast|| swipeLeft);
    const isSwipedEnough = Math.abs(length) > MIN_PERCENT || Math.abs(velocityX) > MIN_VELOCITY;

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

	useEvent('resize', () => {
    // setTranslate(currentSlide * -slideWidth.current)
  });

	useEffect(() => {
		startAnimation();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSlide]);

	useEffect(() => {
		if (slides.current.length > 0) {
			slideWidth.current = slides.current[0].clientWidth;
		}
	}, [slides]);

	useEffect(() => {
		forceUpdate();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		slides,
		currentSlide,
		controls,
		variants,
		handleDragEnd,
		handleSlideChange,
		handleReset,
	} as const;
};
