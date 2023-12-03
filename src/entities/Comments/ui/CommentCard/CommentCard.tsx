import { memo, useCallback, useState } from 'react';
import { SERVER_URL } from 'shared/api/api';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User/model/selectors/userSelectors';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDisptach';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { updateCommentById } from '../../model/services/updateCommentById';
import IconEdit from '../../../../shared/assets/icons/icon-create-article.svg';
import IconDelete from '../../../../shared/assets/icons/icon-delete.svg';
import cls from './CommentCard.module.scss';
import { deleteCommentById } from '../../model/services/deleteCommentById';

interface CommentCardProps {
    className?: string;
    id: number;
    authorId: string;
    avatar: string;
    author: string;
    comment: string;
    slug: string;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const {
        className,
        id,
        authorId,
        avatar,
        author,
        comment,
        slug,
    } = props;

    const { t } = useTranslation('articles');
    const dispatch = useAppDispatch();

    const [readonly, setReadonly] = useState<boolean>(true);
    const [commentText, setCommentText] = useState<string>(comment);
    const [emptyError, setEmptyError] = useState<boolean>(false);

    const user = useSelector(getUserData);
    const allowedToEdit = user?.role === 'ADMIN' || user?.id === authorId;

    const onDeleteComment = useCallback(() => {
        dispatch(deleteCommentById({ id, slug }));
    }, [dispatch, id, slug]);

    const onSetReadonly = useCallback(() => {
        setReadonly(false);
    }, []);

    const onCancelReadonly = useCallback(() => {
        setReadonly(true);
        setCommentText(comment);
    }, [comment]);

    const onChangeComment = useCallback((value: string) => {
        setCommentText(value);
        setEmptyError(false);
    }, []);

    const onUpdateComment = useCallback(() => {
        if (commentText !== '') {
            dispatch(updateCommentById({ id, text: commentText, slug }));
            setReadonly(true);
        }

        if (commentText === '') {
            setEmptyError(true);
        }
    }, [commentText, dispatch, id, slug]);

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
                        {readonly && (
                            <Button
                                theme={ButtonTheme.CLEAR}
                                onClick={onSetReadonly}
                            >
                                <Icon
                                    Svg={IconEdit}
                                    className={cls.iconEdit}
                                />
                            </Button>
                        )}
                        <Button
                            theme={ButtonTheme.CLEAR}
                            onClick={onDeleteComment}
                        >
                            <Icon
                                Svg={IconDelete}
                                className={cls.iconDelete}
                            />
                        </Button>
                    </div>
                )}
            </div>
            <div
                className={cls.commentSection}
            >
                <Input
                    value={commentText}
                    onChange={onChangeComment}
                    readonly={readonly}
                    className={classNames('', {
                        [cls.readonly]: readonly,
                        [cls.emptyError]: emptyError,
                    }, [])}
                />
                {!readonly && (
                    <Button
                        onClick={onCancelReadonly}
                    >
                        {t('cancel comment edit')}
                    </Button>
                )}
                {!readonly && (
                    <Button
                        theme={ButtonTheme.BACKGROUND_INVERTED}
                        onClick={onUpdateComment}
                    >
                        {t('approve comment edit')}
                    </Button>
                )}
            </div>
        </div>
    );
});
