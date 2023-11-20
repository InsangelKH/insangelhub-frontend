import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { SERVER_URL } from 'shared/api/api';
import { ArticleType } from 'entities/Article/model/types/article';
import { ArticleView } from '../../model/types/articlesList';
import cls from './ArticleCard.module.scss';

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
        articleView = ArticleView.SMALL,
    } = props;

    const { t } = useTranslation('articles');
    const dateObject = createdAt ? new Date(createdAt) : null;

    const day = dateObject?.getDate().toString().padStart(2, '0');
    const month = dateObject?.getMonth()?.toString().padStart(2, '0');
    const year = dateObject?.getFullYear();

    const date = `${day}.${month}.${year}`;

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
                <Button className={cls.btnBig}>
                    {t('read more')}
                </Button>
            </div>
        );
    }

    return (
        <div className={classNames(cls.cardSmall, {}, [className])}>
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
