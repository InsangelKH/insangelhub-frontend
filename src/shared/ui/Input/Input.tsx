import { InputHTMLAttributes, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

export enum InputTheme {
    DEFAULT = 'default',
    CLEAR = 'clear',
}

interface InputProps extends HTMLInputProps{
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    readonly?: boolean;
    theme?: InputTheme;
    placeholder?: string;
    emptyError?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        readonly,
        type = 'text',
        theme = InputTheme.DEFAULT,
        placeholder,
        emptyError,
        ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <input
            className={classNames(cls.Input, {
                [cls.readonly]: readonly,
                [cls.emptyError]: emptyError,
            }, [className, cls[theme]])}
            value={value}
            type={type}
            onChange={onChangeHandler}
            readOnly={readonly}
            placeholder={placeholder}
        />
    );
});
