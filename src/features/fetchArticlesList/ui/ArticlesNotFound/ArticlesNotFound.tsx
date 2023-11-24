import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './ArticlesNotFound.module.scss';

interface ArticleErrorProps {
    className?: string;
}

export const ArticlesNotFound = memo((props: ArticleErrorProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('articles');

    return (
        <h1 className={classNames(cls.ArticlesNotFound, {}, [className])}>
            {t('articles not found')}
        </h1>
    );
});
