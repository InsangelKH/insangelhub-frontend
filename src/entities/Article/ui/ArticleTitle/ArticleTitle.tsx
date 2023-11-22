import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { SERVER_URL } from 'shared/api/api';
import { Icon } from 'shared/ui/Icon/Icon';
import { formattedDate } from 'shared/lib/date/date';
import { Article } from '../../model/types/article';
import cls from './ArticleTitle.module.scss';
import IconCalendar from '../../../../shared/assets/icons/icon-calendar.svg';
import IconPen from '../../../../shared/assets/icons/icon-pen.svg';

interface ArticleTitleProps {
    className?: string;
    article?: Article;
}

export const ArticleTitle = memo((props: ArticleTitleProps) => {
    const {
        className,
        article,
    } = props;

    const navigate = useNavigate();

    const createdAt = formattedDate(article?.createdAt);
    const updatedAt = formattedDate(article?.updatedAt);

    const onUserClick = useCallback(() => {
        navigate(`${RoutePath.profile}${article?.author.id}`);
    }, [article?.author.id, navigate]);

    return (
        <>
            <div
                className={classNames(cls.authorField, {}, [className])}
                onClick={onUserClick}
            >
                <img
                    className={cls.authorAvatar}
                    src={`${SERVER_URL}/images/${article?.author.image}`}
                    alt={article?.author?.image}
                />
                <div className={cls.author}>{article?.author.username}</div>
            </div>
            <h1 className={cls.title}>{article?.title}</h1>
            <h2 className={cls.subtitle}>{article?.subtitle}</h2>
            <div className={cls.date}>
                <Icon
                    Svg={IconCalendar}
                    className={cls.icon}
                />
                <p>{createdAt}</p>
            </div>
            {article?.createdAt !== article?.updatedAt && (
                <div className={cls.date}>
                    <Icon
                        Svg={IconPen}
                        className={cls.iconPen}
                    />
                    <p>{updatedAt}</p>
                </div>
            )}
        </>
    );
});
