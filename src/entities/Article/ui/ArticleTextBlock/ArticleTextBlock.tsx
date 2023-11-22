import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { TextBlock } from '../../model/types/article';
import cls from './ArticleTextBlock.module.scss';

interface ArticleTextProps {
    className?: string;
    block?: TextBlock;
}

export const ArticleTextBlock = memo((props: ArticleTextProps) => {
    const {
        className,
        block,
    } = props;

    return (
        <div className={classNames(cls.ArticleText, {}, [className])}>
            {block?.title !== '' && (
                <h3 className={cls.title}>
                    {block?.title}
                </h3>
            )}
            {block?.paragraphs.map((paragrpah, index) => (
                <div
                    className={cls.paragrpahs}
                    key={index}
                >
                    {paragrpah}
                </div>
            ))}
        </div>
    );
});
