import { ArticleType } from 'entities/Article/model/types/article';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SERVER_URL } from 'shared/api/api';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router';
import { formattedDate } from 'shared/lib/date/date';
import { ArticleView } from '../../model/types/ArticlesListSchema';
import cls from './ArticleCard.module.scss';
import { ArticleListIsLoading } from '../ArticleListIsLoading/ArticleListIsLoading';

interface ArticleCardProps {
    className?: string;
    articleView?: ArticleView;
    avatar?: string;
    author?: string;
    createdAt?: string;
    title?: string;
    subtitle?: string;
    image?: string;
    paragraphs?: string[];
    types?: ArticleType[];
    slug?: string;
}

export const ArticleCard = memo((props: ArticleCardProps) => {
    const {
        className,
        avatar,
        author,
        createdAt,
        title,
        subtitle,
        image,
        paragraphs,
        types,
        slug,
        articleView = ArticleView.SMALL,
    } = props;

    const { t } = useTranslation('articles');

    const date = formattedDate(createdAt);

    const navigate = useNavigate();

    const onNavigate = useCallback(() => {
        navigate(`${RoutePath.article_details}${slug}`);
    }, [navigate, slug]);

    if (articleView === ArticleView.BIG) {
        return (
            <div className={cls.cardBig}>
                <div className={cls.authorDate}>
                    <img
                        src={`${SERVER_URL}/images/${avatar}`}
                        alt={`${author} avatar`}
                        className={cls.avatarBig}
                    />
                    <div className={cls.authorBig}>
                        {author}
                    </div>
                    <div className={cls.dateBig}>
                        {date}
                    </div>
                </div>
                <h2 className={cls.titleBig}>
                    {title}
                </h2>
                <div className={cls.subtitleBig}>
                    {subtitle}
                </div>
                <img
                    src={`${SERVER_URL}/images/${image}`}
                    alt={`${title} pic`}
                    className={cls.imageBig}
                />
                <div className={cls.typeBig}>
                    {types?.join(' ')}
                </div>
                <div className={cls.textBig}>
                    {paragraphs?.map((paragraph) => paragraph)}
                </div>
                <Button
                    className={cls.btnBig}
                    onClick={() => onNavigate()}
                >
                    {t('read more')}
                </Button>
            </div>
        );
    }

    return (
        <div
            className={classNames(cls.cardSmall, {}, [className])}
            onClick={() => onNavigate()}
        >
            <img
                src={`${SERVER_URL}/images/${image}`}
                alt={`${title} pic`}
                className={cls.imageSmall}
            />
            <div className={cls.typeSmall}>
                {types?.join(' ')}
            </div>
            <div className={cls.titleSmall}>
                {title}
            </div>
        </div>
    );
});
