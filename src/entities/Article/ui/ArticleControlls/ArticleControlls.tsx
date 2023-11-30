import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { deleteArticleBySlug } from '../../model/services/deleteArticleBySlug';
import cls from './ArticleControlls.module.scss';

interface ArticleControllsProps {
    className?: string;
    slug: string,
}

export const ArticleControlls = memo((props: ArticleControllsProps) => {
    const {
        className,
        slug,
    } = props;

    const { t } = useTranslation('articles');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onDelete = useCallback(() => {
        dispatch(deleteArticleBySlug({ slug }));
    }, [dispatch, slug]);

    const onEdit = useCallback(() => {
        navigate(`/${RoutePath.article_update}${slug}`);
    }, [navigate, slug]);

    return (
        <div className={classNames(cls.ArticleControlls, {}, [className])}>
            <Button
                theme={ButtonTheme.DANGER}
                className={cls.deleteBtn}
                onClick={onDelete}
            >
                {t('Delete')}
            </Button>
            <Button
                theme={ButtonTheme.BACKGROUND_INVERTED}
                className={cls.updateBtn}
                onClick={onEdit}
            >
                {t('Update')}
            </Button>
        </div>
    );
});
