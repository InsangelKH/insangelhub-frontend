import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

interface TextAreaProps {
    className?: string;
    rows?: number;
    cols?: number;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = memo((props: TextAreaProps) => {
    const {
        className,
        rows,
        cols,
        value,
        onChange,
    } = props;

    return (
        <textarea
            className={classNames('', {}, [className])}
            value={value}
            onChange={onChange}
            rows={rows}
            cols={cols}
        />
    );
});
