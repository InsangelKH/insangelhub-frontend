import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { SERVER_URL } from 'shared/api/api';
import { ImageBlock } from '../../model/types/article';
import cls from './ArticleImageBlock.module.scss';

interface ArticleImageBlockProps {
    className?: string;
    block?: ImageBlock;
}

export const ArticleImageBlock = memo((props: ArticleImageBlockProps) => {
    const {
        className,
        block,
    } = props;

    return (
        <div className={classNames(cls.ArticleImageBlock, {}, [className])}>
            <img
                src={`${SERVER_URL}/images/${block?.src}`}
                alt="img"
                className={cls.image}
            />
            <div className={cls.title}>{block?.title}</div>
        </div>
    );
});
