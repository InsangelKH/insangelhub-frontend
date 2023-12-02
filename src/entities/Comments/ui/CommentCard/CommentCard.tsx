import { memo } from 'react';
import { SERVER_URL } from 'shared/api/api';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User/model/selectors/userSelectors';
import IconEdit from '../../../../shared/assets/icons/icon-create-article.svg';
import IconDelete from '../../../../shared/assets/icons/icon-delete.svg';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string;
    id: number;
    authorId: string;
    avatar: string;
    author: string;
    comment: string;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const {
        className,
        id,
        authorId,
        avatar,
        author,
        comment,
    } = props;

    const user = useSelector(getUserData);
    const allowedToEdit = user?.role === 'ADMIN' || user?.id === authorId;

    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            <div className={cls.authorButtons}>
                <div className={cls.authorSection}>
                    <img
                        className={cls.avatar}
                        src={`${SERVER_URL}/images/${avatar}`}
                        alt="authorIMG"
                    />
                    <p className={cls.username}>
                        {author}
                    </p>
                </div>
                {allowedToEdit && (
                    <div className={cls.buttons}>
                        <Icon
                            Svg={IconEdit}
                            className={cls.iconEdit}
                        />
                        <Icon
                            Svg={IconDelete}
                            className={cls.iconDelete}
                        />
                    </div>
                )}
            </div>
            <p className={cls.comment}>
                {comment}
            </p>
        </div>
    );
});
