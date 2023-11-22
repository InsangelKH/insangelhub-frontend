import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './ArticleListError.module.scss';

interface ArticleErrorProps {
    className?: string;
}

export const ArticleListError = memo((props: ArticleErrorProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('articles');

    return (
        <h1 className={classNames(cls.ArticleListError, {}, [className])}>
            {t('article list error')}
        </h1>
    );
});
