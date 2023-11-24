import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './ArticlesListError.module.scss';

interface ArticlesListErrorProps {
    className?: string;
}

export const ArticlesListError = memo((props: ArticlesListErrorProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('articles');

    return (
        <h2 className={classNames(cls.ArticlesListError, {}, [className])}>
            {t('article srv error')}
        </h2>
    );
});
