import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { useSelector } from 'react-redux';
import { SERVER_URL } from 'shared/api/api';
import { Button } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { formattedDate } from 'shared/lib/date/date';
import { getArticleBySlug } from '../model/services/getArticleBySlug';
import { articleReducer } from '../model/slice/articleSlice';
import cls from './Article.module.scss';
import { getArticle } from '../model/selectors/articleSelectors';
import IconCalendar from '../../../shared/assets/icons/icon-calendar.svg';
import IconPen from '../../../shared/assets/icons/icon-pen.svg';

interface ArticleProps {
    className?: string;
    slug: string;
}

const initalReducers: ReducersList = {
    article: articleReducer,
};

export const Article = memo((props: ArticleProps) => {
    const {
        className,
        slug,
    } = props;

    const { t } = useTranslation('articles');

    const dispatch = useAppDispatch();

    const article = useSelector(getArticle);

    const createdAt = formattedDate(article?.createdAt);
    const updatedAt = formattedDate(article?.updatedAt);

    const onBack = useCallback(() => {
        window.history.back();
    }, []);

    useEffect(() => {
        dispatch(getArticleBySlug({ slug }));
    }, [dispatch, slug]);

    return (
        <DynamicModuleLoader reducers={initalReducers}>
            <div className={classNames(cls.Article, {}, [className])}>
                <Button
                    className={cls.backBtn}
                    onClick={onBack}
                >
                    {t('Back')}
                </Button>
                <img
                    className={cls.authorAvatar}
                    src={`${SERVER_URL}/images/${article?.author.image}`}
                    alt={article?.author?.image}
                />
                <h1 className={cls.title}>{article?.title}</h1>
                <h2 className={cls.subtitle}>{article?.subtitle}</h2>
                <div className={cls.date}>
                    <Icon
                        Svg={IconCalendar}
                        className={cls.icon}
                    />
                    <p>{createdAt}</p>
                </div>
                {createdAt !== updatedAt && (
                    <div className={cls.date}>
                        <Icon
                            Svg={IconPen}
                            className={cls.iconPen}
                        />
                        <p>{updatedAt}</p>
                    </div>
                )}
            </div>
        </DynamicModuleLoader>
    );
});
