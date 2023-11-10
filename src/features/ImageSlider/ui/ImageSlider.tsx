import { memo, useEffect, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import NestJS from '../../../shared/assets/pictures/nestjs.jpg';
import ReactRedux from '../../../shared/assets/pictures/reactredux.jpg';
import cls from './ImageSlider.module.scss';

interface ImageSliderProps {
  className?: string;
}

export const ImageSlider = memo((props: ImageSliderProps) => {
    const { className } = props;
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const slider = sliderRef.current;

        if (slider) {
            let scrollDirection = 1; // 1 for scrolling down, -1 for scrolling up
            let scrollInterval: NodeJS.Timeout | null = null;

            const startAutoScroll = () => {
                scrollInterval = setInterval(() => {
                    if (slider.scrollTop >= slider.scrollHeight - slider.clientHeight - 5) {
                        // Reached the bottom, change direction to scroll up
                        scrollDirection = -1;
                    } else if (slider.scrollTop <= 0) {
                        // Reached the top, change direction to scroll down
                        scrollDirection = 1;
                    }

                    slider.scrollBy(0, scrollDirection);
                }, 10);
            };

            startAutoScroll();

            // Cleanup interval on component unmount
            return () => {
                if (scrollInterval) {
                    clearInterval(scrollInterval);
                }
            };
        }
    }, []);

    return (
        <div ref={sliderRef} className={classNames(cls.ImageSlider, {}, [className])}>
            <img src={ReactRedux} alt="react/redux" />
            <img src={NestJS} alt="nestjs" />
        </div>
    );
});
