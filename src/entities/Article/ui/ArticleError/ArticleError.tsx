import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './ArticleError.module.scss';

interface ArticleErrorProps {
    className?: string;
}

export const ArticleError = memo((props: ArticleErrorProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('articles');

    return (
        <h1 className={classNames(cls.ArticleError, {}, [className])}>
            {t('article error')}
        </h1>
    );
});
