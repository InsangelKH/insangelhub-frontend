import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Button } from 'shared/ui/Button/Button';
import cls from './ArticleIsLoading.module.scss';

interface ArticleIsLoadingProps {
    className?: string;
}

export const ArticleIsLoading = memo((props: ArticleIsLoadingProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('articles');

    const onBack = useCallback(() => {
        window.history.back();
    }, []);

    return (
        <div className={classNames(cls.ArticleIsLoading, {}, [className])}>
            <Button
                className={cls.backBtn}
                onClick={onBack}
            >
                {t('Back')}
            </Button>
            <Skeleton
                width={150}
                height={150}
                border="50%"
                className={cls.avatar}
            />
            <Skeleton
                width="20%"
                height={60}
                className={cls.title}
            />
            <Skeleton
                width="100%"
                height={400}
                className={cls.content}
            />
        </div>
    );
});
