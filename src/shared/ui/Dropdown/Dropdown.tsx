import React, {
    memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '../Button/Button';
import cls from './Dropdown.module.scss';

type Option = OptionalRecord<string, string>;

interface DropdownProps {
    className?: string;
    defaultValue: string;
    options: Option[];
    onChange?: (value: string) => void;
}

export const Dropdown = memo((props: DropdownProps) => {
    const {
        className,
        defaultValue,
        options,
        onChange,
    } = props;

    const [isClosed, setIsClosed] = useState(true);
    const [selectedOption, setSelectedOption] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const optionsMods = {
        [cls.closed]: isClosed,
        [cls.opened]: !isClosed,
    };

    const handleSelect = useCallback((option: string, value: string) => {
        onChange?.(option);
        setSelectedOption(value);
        setIsClosed(true);
    }, [onChange]);

    const onToggle = useCallback(() => {
        setIsClosed(!isClosed);
    }, [isClosed]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsClosed(true);
        }
    }, [dropdownRef]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLButtonElement>) => {
        onChange?.(e.currentTarget.value);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div
            className={classNames(cls.Dropdown, {}, [className])}
            ref={dropdownRef}
        >
            <Button
                className={cls.dropDownBtn}
                theme={ButtonTheme.CLEAR}
                onClick={onToggle}
                onChange={onChangeHandler}
            >
                {selectedOption || defaultValue}
            </Button>
            <div
                className={classNames(cls.options, optionsMods, [])}
            >
                {options.map((option, index) => (
                    <div
                        className={cls.dropDownOption}
                        key={index}
                        onClick={() => handleSelect(option.key as string, option.value as string)}
                    >
                        {option.value}
                    </div>
                ))}
            </div>
        </div>
    );
});
