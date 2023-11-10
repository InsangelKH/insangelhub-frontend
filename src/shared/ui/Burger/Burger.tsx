import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './Burger.module.scss';
import { Icon } from '../Icon/Icon';
import BurgerIcon from '../../assets/icons/icon-fold.svg';

interface BurgerProps {
    className?: string;
    onClick?: () => void;
}

export const Burger = memo((props: BurgerProps) => {
    const {
        className,
        onClick,
    } = props;

    const { t } = useTranslation();

    return (
        <div
            className={classNames(cls.Burger, {}, [className])}
            onClick={onClick}
        >
            <Icon Svg={BurgerIcon} className={cls.fold} />
        </div>
    );
});
