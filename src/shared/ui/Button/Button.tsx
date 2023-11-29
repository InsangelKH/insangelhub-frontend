import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clear_inverted',
    NONE = 'none',
    DANGER = 'danger',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children?: ReactNode;
    disabled?: boolean;
    theme?: ButtonTheme;
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        disabled,
        theme = ButtonTheme.BACKGROUND,
        ...otherProps
    } = props;

    return (
        <button
            className={classNames(cls.Button, { [cls.disabled]: disabled }, [className, cls[theme]])}
            type="button"
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});
